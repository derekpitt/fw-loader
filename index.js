const fs = require("fs");
const path = require("path");

module.exports = function(content, inputMap) {
  this.cacheable();

  // a fix for decorator
  content = content.replace(/undefined\.__decorate/, '__decorate');

  const htmlPath = this.resourcePath.replace(/\.[^/.]+$/, "") + ".html";

  try {
    const stats = fs.statSync(htmlPath);
    if (stats.isFile()) {
      var staticTemplateRequires = "";

      const regExNoDecorate = /class (\w+)/gi;
      var array;

      while ((array = regExNoDecorate.exec(content)) !== null) {
        staticTemplateRequires += array[1] + ".__template = require('./" + path.basename(htmlPath) + "');\n";
      }

      this.callback(null, content + "\n" + staticTemplateRequires, inputMap);
      return;
    }

  } catch(err) { }

  this.callback(null, content, inputMap);
  return;
}
