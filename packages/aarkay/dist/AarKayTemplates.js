"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Path_1 = require("./Path");
const Path = require("path");
const NJK = require("nunjucks");
const Walk = require("klaw-sync");
class AarKayTemplates {
    render(modules, name, context) {
        let templates = [];
        let directories = [];
        modules.forEach(element => {
            let path = Path_1.aarkayTemplatefilesPath() + Path.sep + element;
            directories.push(path);
            directories.push(...Walk(path, { nofile: true }).map(item => item.path));
            templates.push(...Walk(path, { nodir: true })
                .map(item => Path.basename(item.path)));
        });
        let filtered = templates.filter(value => value !== ".DS_Store");
        let loader = new NJK.FileSystemLoader(directories);
        let env = new NJK.Environment(loader);
        let template = filtered.filter(value => value.split('.')[0] === name)[0];
        let rendered = env.render(template, context);
        let templateComponents = template.split('.');
        let ext = "";
        if (templateComponents.length > 3) {
            process.exit(128);
        }
        else if (templateComponents.length === 3) {
            ext = templateComponents[1];
        }
        return [rendered, ext];
    }
}
exports.default = AarKayTemplates;
//# sourceMappingURL=AarKayTemplates.js.map