var Metalsmith = require("metalsmith");
var markdown = require("metalsmith-markdown");
var asciidoc = require("metalsmith-asciidoc");
var layouts = require("metalsmith-layouts");
var less = require("metalsmith-less");
var assets = require("metalsmith-static");

var metalsmith = Metalsmith(__dirname)
  .use(markdown())
  .use(asciidoc())
  .use(layouts({
    "engine": "handlebars",
    "directory": "layouts",
    "default": "layout.html",
  }))
  .use(less({
    "pattern": "*.less"
  }))
  .use(assets([{
    "src": "public",
    "dest": "."
  },{
    "src": "node_modules/bootstrap/dist",
    "dest": "vendor/bootstrap"
  },{
    "src": "node_modules/jquery/dist",
    "dest": "vendor/jquery"
  }]))
  .build(function(err){
    if(err) throw err;
  });

console.log("Done!");
