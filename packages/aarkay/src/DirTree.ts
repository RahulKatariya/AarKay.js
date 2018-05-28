import { aarkayGeneratedFilePathFromDatafile } from "./Path"
import * as Walk from "klaw-sync"
import * as Path from "path"

export default class DirTree {
    
    from: string
    to: string

    constructor(from: string, to: string) {
        this.from = from
        this.to = to
    }

    mirror(callback: (from: string, to: string) => void) {
        Walk(this.from, { nodir: true })
            .map(item => item.path)
            .filter(path => Path.basename(path) !== '.DS_Store')
            .forEach(element => {
                let generatedfilePath = aarkayGeneratedFilePathFromDatafile(element)
                callback(element, Path.dirname(generatedfilePath))
            })
    }

}
