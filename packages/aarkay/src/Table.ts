import { table, getBorderCharacters } from "table";
import * as Chalk from "chalk";

export function logRows(...rows: string[]) {
    let rowsArray = rows.map(function(val) { return [val] });
    let config = { border: getBorderCharacters('ramac') };
    console.log(Chalk.default.magenta(table(rowsArray, config).replace(/\n$/, "")));
}
