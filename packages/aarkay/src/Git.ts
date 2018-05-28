import * as CP from "./Exec"
import * as FS from "fs"

export function isDirty(path: string): boolean {
    let gitRoot = CP.execGitRootSync(path)
    if (gitRoot) {
        let gitDiff = CP.execGitDiffSync(path)
        return !gitDiff
    } else {
        let length = FS.readdirSync(path).length
        return length > 0
    }
}
