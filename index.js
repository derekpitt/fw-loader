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
      var staticTemplateRequires = "";

      const regExNoDecorate = /export class (\w+)/gi;
      const regExDecorate = /let (\w+) = class (\w+)/gi;
      var array;

      while ((array = regExDecorate.exec(content)) !== null) {
        staticTemplateRequires += array[1] + ".__template = require('./" + path.basename(htmlPath) + "');\n";
      }

      while ((array = regExNoDecorate.exec(content)) !== null) {
        staticTemplateRequires += array[1] + ".__template = require('./" + path.basename(htmlPath) + "');\n";
      }

      return content + "\n" + staticTemplateRequires;
    }

  } catch(err) { }

  return content;
}
