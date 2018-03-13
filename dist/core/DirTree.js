"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Path_1 = require("./../ext/Path");
const Walk = require("klaw-sync");
const Path = require("path");
class DirTree {
    constructor(from, to) {
        this.from = from;
        this.to = to;
    }
    mirror(callback) {
        let files = Walk(this.from, { nodir: true })
            .map(item => item.path)
            .filter(path => Path.basename(path) !== '.DS_Store')
            .forEach(element => {
            let generatedfilePath = Path_1.aarkayGeneratedFilePathFromDatafile(element);
            callback(element, Path.dirname(generatedfilePath));
        });
    }
}
exports.default = DirTree;
