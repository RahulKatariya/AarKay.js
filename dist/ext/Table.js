"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table_1 = require("table");
const Chalk = require("chalk");
function logRows(...rows) {
    let rowsArray = rows.map(function (val) { return [val]; });
    let config = { border: table_1.getBorderCharacters('ramac') };
    console.log(Chalk.default.magenta(table_1.table(rowsArray, config).replace(/\n$/, "")));
}
exports.logRows = logRows;
