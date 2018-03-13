"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FS = require("fs-extra");
const Path = require("path");
const Chalk = require("chalk");
const AarKayTemplates_1 = require("./AarKayTemplates");
class GeneratedFile {
    constructor(modules, destination, directory, name, template, context) {
        this.modules = modules;
        this.destination = destination;
        this.directory = directory;
        this.name = name;
        this.template = template;
        this.context = context;
    }
    render() {
        let templatefile = new AarKayTemplates_1.default().render(this.modules, this.template, this.context);
        let contents = templatefile[0];
        let ext = templatefile[1];
        let nameWithExt = ext.length === 0 ? this.name : this.name + "." + ext;
        let destinationComponents = [this.destination, this.directory, nameWithExt]
            .filter(value => value.length !== 0);
        let destination = Path.join(...destinationComponents);
        try {
            if (FS.existsSync(destination)) {
                let currentContents = FS.readFileSync(destination, { encoding: "utf8" });
                if (contents === currentContents) {
                    console.log("   <-> " + destination);
                }
                else {
                    FS.ensureDirSync(Path.dirname(destination));
                    FS.writeFileSync(destination, contents);
                    console.log(Chalk.default.yellow("   <*> " + destination));
                }
            }
            else {
                FS.ensureDirSync(Path.dirname(destination));
                FS.writeFileSync(destination, contents);
                console.log(Chalk.default.green("   <+> " + destination));
            }
        }
        catch (_a) {
            console.log(Chalk.default.red("   <!> " + destination));
        }
    }
}
exports.default = GeneratedFile;
