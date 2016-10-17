const fs = require("fs");
const path = require("path");

module.exports = function(content) {
  this.cacheable();

  // a fix for decorator
  content = content.replace(/undefined\.__decorate/, '__decorate');

  const htmlPath = this.resourcePath.replace(/\.[^/.]+$/, "") + ".html";

  try {
    const stats = fs.statSync(htmlPath);
    if (stats.isFile()) {
      return content + "\nmodule.exports.__html = require('./" + path.basename(htmlPath) + "');\n";
    }

  } catch(err) { }

  return content;
}
