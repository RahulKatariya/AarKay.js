export const DatafileType = Object.freeze({
    SINGLE: 0,
    COLLECTION: 1
});

export function datafileTypeFrom(name: string): number {
    let components = name.split('.')[0]
    if (components.startsWith('[') && components.endsWith(']')) {
        return DatafileType.COLLECTION
    } else {
        return DatafileType.SINGLE
    }
}
