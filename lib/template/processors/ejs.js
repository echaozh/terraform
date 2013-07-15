var ejs = require('ejs')

module.exports = function(fileContents, options){

  return {
    compile: function(){
      return ejs.compile(fileContents.toString(), options)
    },

    parseError: function(error){
      error.stack = fileContents.toString()
      return error
    }
  }

}