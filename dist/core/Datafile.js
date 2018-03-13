"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Path = require("path");
const Yaml = require("js-yaml");
const FS = require("fs-extra");
const GeneratedFile_1 = require("./GeneratedFile");
const DatafileType_1 = require("./DatafileType");
class Datafile {
    constructor(source, destination) {
        this.source = Path.dirname(source);
        this.destination = destination;
        this.name = Path.basename(source);
        this.type = DatafileType_1.datafileTypeFrom(this.name);
        let components = this.name.split('.');
        this.template = components[components.length - 2];
        let fileContents = FS.readFileSync(source, { encoding: "utf8" });
        let yamlContents = Yaml.load(fileContents);
        if (this.type === DatafileType_1.DatafileType.SINGLE) {
            let components = this.name.split(".").join(":")
                .replace("dot:", ".")
                .split(":");
            this.filenames = [yamlContents["_fn"] === undefined ? components[0] : yamlContents["_fn"]];
            this.directories = [yamlContents["_dn"] === undefined ? "" : yamlContents["_dn"]];
            this.contexts = [yamlContents];
        }
        else {
            this.contexts = yamlContents;
            this.filenames = yamlContents.map(contents => contents["_fn"] === undefined ? contents["name"] : contents["_fn"]);
            this.directories = yamlContents.map(contents => contents["_dn"] === undefined ? "" : contents["_dn"]);
        }
    }
    generatedFiles() {
        let generatedFiles = [];
        let generatedFile = this;
        generatedFile.filenames.forEach(function (filename, index) {
            generatedFiles.push(new GeneratedFile_1.default(["AarKay"], generatedFile.destination, generatedFile.directories[index], filename, generatedFile.template, generatedFile.contexts[index]));
        });
        return generatedFiles;
    }
}
exports.default = Datafile;
