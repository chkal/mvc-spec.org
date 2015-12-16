var Metalsmith = require("metalsmith");
var markdown = require("metalsmith-markdown");
var asciidoc = require("metalsmith-asciidoc");
var layouts = require("metalsmith-layouts");
var less = require("metalsmith-less");
var ignore = require("metalsmith-ignore");
var assets = require("metalsmith-static");
var notifier = require("node-notifier");
var argv = require("yargs").argv;

var metalsmith = Metalsmith(__dirname)
  .use(markdown())
  .use(asciidoc())
  .use(layouts({
    "pattern": "*.html",
    "engine": "handlebars",
    "directory": "layouts",
    "partials": "layouts",
    "default": "layout.html",
  }))
  .use(less({
    "pattern": "css/style.less"
  }))
  .use(ignore([
    "**/*.less"
  ]))
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
  .build(function(err) {
    if(err) {
      handleError(err);
    }
    else {
      handleSuccess();
    }
  });

function handleSuccess() {
  if(argv.watch) {
    notifier.notify({
      title: "Metalsmith",
      message: "Build successful!"
    });
  }
  else {
    console.log("Done!");
  }
}

function handleError(err) {
  if(argv.watch) {
    notifier.notify({
      title: "Metalsmith",
      message: "*** Error: " + err.message + " ***"
    });
  }
  else {
    throw err;
  }
}
