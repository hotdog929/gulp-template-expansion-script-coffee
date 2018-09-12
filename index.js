var es = require('event-stream');

var browserify = require('browserify');
var coffeeify = require('coffeeify');

function createScriptEnvContent(version, cdn){
    return 'module.exports = {version:"' + version + '",cdn:"' + cdn + '"};';
}

function buildScript(){
    return es.map(function(file, cb){
        var bundle = browserify({extensions : ['.coffee']});
        bundle.plugin(require('dep-case-verify'));
        bundle.transform(coffeeify, {bare : false, header : true});
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