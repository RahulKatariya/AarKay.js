"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CP = require("child_process");
function execGitRootSync(cwd) {
    let command = '[ -d .git ] || git rev-parse --git-dir > /dev/null 2>&1';
    try {
        CP.execSync(command, { cwd: cwd });
        return true;
    }
    catch (err) {
        return false;
    }
}
exports.execGitRootSync = execGitRootSync;
function execGitDiffSync(cwd) {
    let command = 'git status --porcelain';
    try {
        let status = CP.execSync(command, { cwd: cwd });
        return status.length === 0 ? true : false;
    }
    catch (err) {
        return false;
    }
}
exports.execGitDiffSync = execGitDiffSync;
//# sourceMappingURL=Exec.js.map