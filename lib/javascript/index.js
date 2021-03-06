
var path    = require("path")
var fs      = require("fs")
var helpers = require('../helpers')

/**
 * Build Processor list for javascripts.
 *
 * same as doing...
 *
 *    var processors = {
 *      "coffee" : require("./processors/coffee"),
 *      "ls" : require("./processors/ls")
 *    }
 *
 */
 var processors = {}
helpers.processors["js"].forEach(function(sourceType){
  processors[sourceType] = require("./processors/" + sourceType)
})

module.exports = function(root, filePath, callback){

  var srcPath = path.resolve(root, filePath)
  var ext     = path.extname(srcPath).replace(/^\./, '')

  fs.readFile(srcPath, function(err, data){

    /**
     * File not Found
     */

    if(err && err.code === 'ENOENT') return callback(null, null)

    /**
     * Read File Error
     */

    if(err) return callback(err)

    /**
     * Lookup Directories
     */
    var render = processors[ext].compile(srcPath, data, callback)

  })

}
