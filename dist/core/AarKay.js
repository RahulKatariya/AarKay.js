"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FS = require("fs-extra");
const Path = require("path");
const Table = require("./../ext/Table");
const Chalk = require("chalk");
const Path_1 = require("./../ext/Path");
const Git_1 = require("./../ext/Git");
const DirTree_1 = require("./DirTree");
const Datafile_1 = require("./Datafile");
class AarKay {
    constructor(destinationPath) {
        this.datafilesPath = undefined;
        this.destinationPath = destinationPath;
        let relPath = Path_1.pureRelativeToHomeDir(destinationPath);
        if (relPath !== undefined) {
            this.datafilesPath = Path_1.aarkayDatafilesPathFromSource(relPath);
            FS.ensureDirSync(this.datafilesPath);
        }
    }
    bootstrap() {
        if (this.datafilesPath === undefined) {
            let message = "🚫 Current directory should be relative to home directory.";
            console.log(Chalk.default.red(message));
            return;
        }
        Table.logRows("🚀 Launch---i--n--g--> " + this.destinationPath, "🙏🏻 AarKayFiles-------> " + this.datafilesPath);
        if (Git_1.isDirty(this.destinationPath)) {
            let message = "🚫 Please discard or stash all your changes or use it inside an empty folder.";
            console.log(Chalk.default.red(message));
            return;
        }
        let dirTree = new DirTree_1.default(this.datafilesPath, this.destinationPath);
        dirTree.mirror(function (from, to) {
            console.log(Chalk.default.blue("<^> " + Path.basename(from)));
            let datafile = new Datafile_1.default(from, to);
            datafile.generatedFiles().forEach(element => element.render());
        });
    }
}
exports.default = AarKay;
