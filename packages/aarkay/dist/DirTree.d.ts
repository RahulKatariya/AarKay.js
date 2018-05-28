export default class DirTree {
    from: string;
    to: string;
    constructor(from: string, to: string);
    mirror(callback: (from: string, to: string) => void): void;
}
