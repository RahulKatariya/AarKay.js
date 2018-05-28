import GeneratedFile from "./GeneratedFile";
export default class Datafile {
    source: string;
    destination: string;
    name: string;
    type: number;
    template: string;
    filenames: string[];
    directories: string[];
    contexts: {
        [key: string]: string;
    }[];
    constructor(source: string, destination: string);
    generatedFiles(): GeneratedFile[];
}
