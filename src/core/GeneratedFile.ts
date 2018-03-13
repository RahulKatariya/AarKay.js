import * as FS from "fs-extra"
import * as Path from "path"
import * as Chalk from "chalk"
import AarKayTemplates from "./AarKayTemplates"

export default class GeneratedFile {

    modules: string[]
    destination: string
    directory: string
    name: string
    template: string
    context: object

    constructor(
        modules: string[],
        destination: string,
        directory: string,
        name: string,
        template: string,
        context: object
    ) {
        this.modules = modules
        this.destination = destination
        this.directory = directory
        this.name = name
        this.template = template
        this.context = context
    }

    render() {

        let templatefile = new AarKayTemplates().render(
            this.modules,
            this.template,
            this.context
        )

        let contents = templatefile[0]
        let ext = templatefile[1]

        let nameWithExt = ext.length === 0 ? this.name : this.name + "." + ext
        let destinationComponents = [this.destination, this.directory, nameWithExt]
            .filter(value => value.length !== 0)
        let destination = Path.join(...destinationComponents)

        try {
            if (FS.existsSync(destination)) {
                let currentContents = FS.readFileSync(destination, { encoding: "utf8" })
                if (contents === currentContents) {
                    console.log("   <-> " + destination)
                } else {
                    FS.ensureDirSync(Path.dirname(destination))
                    FS.writeFileSync(destination, contents)
                    console.log(Chalk.default.yellow("   <*> " + destination))
                }
            } else {
                FS.ensureDirSync(Path.dirname(destination))
                FS.writeFileSync(destination, contents)
                console.log(Chalk.default.green("   <+> " + destination))
            }
        } catch {
            console.log(Chalk.default.red("   <!> " + destination))
        }

    }

}
