import * as FS from "fs-extra";
import * as Path from "path"
import * as Table from "./Table"
import * as Chalk from "chalk"
import { pureRelativeToHomeDir, aarkayDatafilesPathFromSource } from "./Path"
import { isDirty } from "./Git"
import DirTree from "./DirTree"
import Datafile from "./Datafile";

export default class AarKay {

    destinationPath: string
    datafilesPath?: string = undefined

    constructor(destinationPath: string) {
        this.destinationPath = destinationPath
        let relPath = pureRelativeToHomeDir(destinationPath)
        if (relPath !== undefined) {
            this.datafilesPath = aarkayDatafilesPathFromSource(relPath)
            FS.ensureDirSync(this.datafilesPath)
        }
    }

    bootstrap() {

        if (this.datafilesPath === undefined) {
            let message = "🚫 Current directory should be relative to home directory."
            console.log(Chalk.default.red(message))
            return;
        }

        Table.logRows(
            "🚀 Launch---i--n--g--> " + this.destinationPath,
            "🙏🏻 AarKayFiles-------> " + this.datafilesPath
        )

        if (isDirty(this.destinationPath)) {
            let message = "🚫 Please discard or stash all your changes or use it inside an empty folder."
            console.log(Chalk.default.red(message))
            return;
        }

        let dirTree = new DirTree(this.datafilesPath, this.destinationPath)
        dirTree.mirror(function(from: string, to: string) {
            console.log(Chalk.default.blue("<^> " + Path.basename(from)))
            let datafile = new Datafile(from, to)
            datafile.generatedFiles().forEach(element => element.render())
        })

    }

}
