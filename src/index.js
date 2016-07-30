"use strict";

const getResolver	= require('./resolver');
const tangler		= require('tangler');


function bzRun(importee, importer = null) {
    return tangler.run(importee, importer, {
    	resolver: getResolver()
    });
}

function bzRequire(importee, importer = null) {
    return tangler.require(importee, importer, {
    	resolver: getResolver()	
    });
}

module.exports.run = bzRun;
module.exports.require = bzRequire;