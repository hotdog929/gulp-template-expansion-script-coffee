var es = require('event-stream');

var browserify = require('browserify');
var coffeeify = require('coffeeify');
var casesensitiverequire = require('browserify-casesensitiverequire');

function createScriptEnvContent(version, cdn){
    return 'module.exports = {version:"' + version + '",cdn:"' + cdn + '"};';
}

function buildScript(){
    return es.map(function(file, cb){
        var bundle = browserify({extensions : ['.coffee']});
        bundle.transform(coffeeify, {bare : false, header : true});
        bundle.transform(casesensitiverequire);
        bundle.add(file.path);
        bundle.bundle(function(error, result){
            if(error != null){
                console.log(error);
                throw error;
            }
            file.contents = new Buffer(result);
            cb(null, file);
        });
    });
}

function gulpTemplateExpansionScriptCoffee(expansion){
    expansion.createScriptEnvContent = createScriptEnvContent;
    expansion.buildScript = buildScript;
    return gulpTemplateExpansionScriptCoffee;
}

gulpTemplateExpansionScriptCoffee.createScriptEnvContent = createScriptEnvContent;
gulpTemplateExpansionScriptCoffee.buildScript = buildScript;

if(typeof(window) != 'undefined' && window != null){
    window['gulpTemplateExpansionScriptCoffee'] = gulpTemplateExpansionScriptCoffee;
}

if(typeof(module) != 'undefined' && module != null){
    module.exports = gulpTemplateExpansionScriptCoffee;    
}