"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatafileType = Object.freeze({
    SINGLE: 0,
    COLLECTION: 1
});
function datafileTypeFrom(name) {
    let components = name.split('.')[0];
    if (components.startsWith('[') && components.endsWith(']')) {
        return exports.DatafileType.COLLECTION;
    }
    else {
        return exports.DatafileType.SINGLE;
    }
}
exports.datafileTypeFrom = datafileTypeFrom;
