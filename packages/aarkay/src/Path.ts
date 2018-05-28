import * as Path from "path"
import * as OS from "os"

function pureRelative(from: string, to: string): string | undefined {
    let relativePath = Path.relative(from, to);
    let components = relativePath.split(Path.sep);
    return components[0] !==  ".." ? relativePath : undefined;
}

export function pureRelativeToHomeDir(to: string): string | undefined {
    return pureRelative(OS.homedir(), to)
}

export function aarkayDatafilesPathFromSource(path: string): string {
    return aarkayDatafilesPath() + Path.sep + path;
}

export function aarkayGeneratedFilePathFromDatafile(path: string): string {
    let relativeDatafile = Path.relative(aarkayDatafilesPath(), path)
    return OS.homedir() + Path.sep + relativeDatafile
}

export function aarkayDatafilesPath(): string {
    return OS.homedir() + Path.sep + 'AarKayJS' + Path.sep + 'AarKayData'
}

export function aarkayTemplatefilesPath(): string {
    return OS.homedir() + Path.sep + 'AarKayJS' + Path.sep + 'AarKayTemplates';
}
