
const tangler           = require('tangler');
const nodeResolver      = require('tangler/src/node-resolver');
const bizubee           = require('bizubee-compiler');
const fs                = require('fs');
const path              = require('path');

const extension = 'bz';
const utilsPath = 'bizubee utils';

function createContext(absPath) {
	const context = {};
	for (var key in global) {
		context[key] = global[key];
	}

	context.__dirname = path.dirname(absPath);
	context.__filename = absPath;
	context.global = context;

	delete context.require;

	return context;
}

function bizubeeResolver(options = {}) {
    const defaultResolver = nodeResolver(options);
    return {
        // importee and importer are both paths
        resolveId(importee, importer = null) {
            if (importee === utilsPath)
                return importee;
            else 
                return defaultResolver.resolveId(importee, importer);
        },
        // id is an absolute path
        load(id) {
            if (id === utilsPath) {
                const utilPath = `${__dirname}/utils.js`;
                const source = fs.readFileSync(utilPath, 'utf8');
                
                return {source};
            }
            
            if (id.endsWith(`.${extension}`)) {
                const source    = fs.readFileSync(id, 'utf8');
                const context   = createContext(id);
                const ast       = bizubee
                    .parseString(source)
                    .getJSTree({});
                return {context, source, ast};
            } else {
                return defaultResolver.load(id);
            }
        }
    }
}

module.exports = bizubeeResolver;

