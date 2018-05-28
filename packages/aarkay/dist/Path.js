"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Path = require("path");
const OS = require("os");
function pureRelative(from, to) {
    let relativePath = Path.relative(from, to);
    let components = relativePath.split(Path.sep);
    return components[0] !== ".." ? relativePath : undefined;
}
function pureRelativeToHomeDir(to) {
    return pureRelative(OS.homedir(), to);
}
exports.pureRelativeToHomeDir = pureRelativeToHomeDir;
function aarkayDatafilesPathFromSource(path) {
    return aarkayDatafilesPath() + Path.sep + path;
}
exports.aarkayDatafilesPathFromSource = aarkayDatafilesPathFromSource;
function aarkayGeneratedFilePathFromDatafile(path) {
    let relativeDatafile = Path.relative(aarkayDatafilesPath(), path);
    return OS.homedir() + Path.sep + relativeDatafile;
}
exports.aarkayGeneratedFilePathFromDatafile = aarkayGeneratedFilePathFromDatafile;
function aarkayDatafilesPath() {
    return OS.homedir() + Path.sep + 'AarKayJS' + Path.sep + 'AarKayData';
}
exports.aarkayDatafilesPath = aarkayDatafilesPath;
function aarkayTemplatefilesPath() {
    return OS.homedir() + Path.sep + 'AarKayJS' + Path.sep + 'AarKayTemplates';
}
exports.aarkayTemplatefilesPath = aarkayTemplatefilesPath;
//# sourceMappingURL=Path.js.map