import { aarkayTemplatefilesPath } from "./../ext/Path"
import * as Path from "path"
import * as FS from "fs";
import * as NJK from "nunjucks"
import * as Walk from "klaw-sync"

export default class AarKayTemplates {

    render(modules: string[], name: string, context: object): string[] {
        let templates: string[] = []
        let directories: string[] = []
        modules.forEach(element => {
            let path = aarkayTemplatefilesPath() + Path.sep + element
            directories.push(path)
            directories.push(...Walk(path, { nofile: true }).map(item => item.path))
            templates.push(
                ...Walk(path, { nodir: true })
                .map(item => Path.basename(item.path))
            )
        })
        let filtered = templates.filter(value => value !== ".DS_Store")
        let loader = new NJK.FileSystemLoader(directories)
        let env = new NJK.Environment(loader)
        let template = filtered.filter(value => value.split('.')[0] === name)[0]
        let rendered = env.render(template, context)
        let templateComponents = template.split('.')
        let ext = ""
        if (templateComponents.length > 3) {
            process.exit(128)
        } else if (templateComponents.length === 3) {
            ext = templateComponents[1]
        }
        return [rendered, ext]
    }

}
