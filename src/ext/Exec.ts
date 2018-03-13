import * as CP from "child_process";

export function execGitRootSync(cwd: string): boolean {
    let command = '[ -d .git ] || git rev-parse --git-dir > /dev/null 2>&1'
    try {
        CP.execSync(command, { cwd: cwd }); return true
    } catch (err) {
        return false
    }
}

export function execGitDiffSync(cwd: string): boolean {
    let command = 'git status --porcelain'
    try {
        let status = CP.execSync(command, { cwd: cwd });
        return status.length === 0 ? true : false
    } catch (err) {
        return false
    }
}
