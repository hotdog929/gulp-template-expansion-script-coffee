var assert = require('assert');
var gulp = require('gulp-param')(require('gulp'), process.argv);
var expansion = require('gulp-template-servlet-expansion');
expansion(gulp, {versionFile:'test/version.properties', cdnFile:'test/cdn.properties'});
var expansionScript = require('../index')(expansion);

describe('gulp-template-expansion-script-coffee', function(){
    it('expansion injection', function(){
        assert(expansionScript.createScriptEnvContent != null);
        assert(expansionScript.buildScript != null);
        assert.equal(expansionScript.createScriptEnvContent, expansion.createScriptEnvContent);
        assert.equal(expansionScript.buildScript, expansion.buildScript);
    });
});