"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CP = require("./Exec");
const FS = require("fs");
function isDirty(path) {
    let gitRoot = CP.execGitRootSync(path);
    if (gitRoot) {
        let gitDiff = CP.execGitDiffSync(path);
        return !gitDiff;
    }
    else {
        let length = FS.readdirSync(path).length;
        return length > 0;
    }
}
exports.isDirty = isDirty;
//# sourceMappingURL=Git.js.map