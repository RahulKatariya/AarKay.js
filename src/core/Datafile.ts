import * as Path from "path"
import * as Yaml from "js-yaml"
import * as FS from "fs-extra"
import GeneratedFile from "./GeneratedFile"
import { DatafileType, datafileTypeFrom } from "./DatafileType";

export default class Datafile {

    source: string
    destination: string
    name: string
    type: number
    template: string
    filenames: string[]
    directories: string[]
    contexts: object[]

    constructor(source: string, destination: string) {
        this.source = Path.dirname(source)
        this.destination = destination
        this.name = Path.basename(source)
        this.type = datafileTypeFrom(this.name)
        let components = this.name.split('.')
        this.template = components[components.length-2]
        let fileContents = FS.readFileSync(source, { encoding: "utf8" })
        let yamlContents = Yaml.load(fileContents)
        if (this.type === DatafileType.SINGLE) {
            let components = this.name.split(".").join(":")
                .replace("dot:", ".")
                .split(":")
            this.filenames = [yamlContents["_fn"] === undefined ? components[0] : yamlContents["_fn"]]
            this.directories = [yamlContents["_dn"] === undefined ? "" : yamlContents["_dn"]]
            this.contexts = [yamlContents]
        } else {
            this.contexts = yamlContents
            this.filenames = yamlContents.map(
                contents => contents["_fn"] === undefined ? contents["name"] : contents["_fn"]
            )
            this.directories = yamlContents.map(
                contents => contents["_dn"] === undefined ? "" : contents["_dn"]
            )
        }
    }

    generatedFiles(): GeneratedFile[] {

        let generatedFiles: GeneratedFile[] = []

        let generatedFile = this
        generatedFile.filenames.forEach(function(filename, index) {
            generatedFiles.push(new GeneratedFile(
                ["AarKay"],
                generatedFile.destination,
                generatedFile.directories[index],
                filename,
                generatedFile.template,
                generatedFile.contexts[index]
            ))
        });

        return generatedFiles
    }

}
