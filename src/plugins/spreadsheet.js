#! /usr/bin/env node
/**
 * Generates vue-i18n file content from google spreadsheet.
 * @author Laurent Bedubourg <lbedubourg@gmail.com>
 */

const _ = require("lodash");
const fs = require("fs");
const axios = require("axios");
const parse = require("csv-parse");
const argv = require("yargs")
    .option("spreadsheet", {
        description: "The google spreadsheet id",
        required: true
    })
    .option("sheet", {
        description: "The name of the spreadsheet's sheet",
        required: true
    })
    .default("format", "json")
    .default("output", "stdout").argv;

const URL = `https://docs.google.com/spreadsheets/d/${argv.spreadsheet}/gviz/tq?tqx=out:csv&sheet=${argv.sheet}`;

const fetchCSV = () => axios.get(URL).then(res => res.data);

const parseCsv = txt =>
    new Promise((resolve, reject) => {
        parse(txt, {columns: true}, (err, records) => {
            if (err) reject(err);
            else resolve(records);
        });
    });

/** From { key:"", en:"", fr:"" }[] extract the languages columns. */
const withLangs = data => ({
    data,
    langs: Object.keys(data[0]).filter(k => k != "key" && k != "")
});

/** Construct language object. */
const buildObject = ({langs, data}) => {
    const result = {};
    data.forEach(element =>
        langs.forEach(lang => {
                if (element[lang]) {
                    _.setWith(
                        result,
                        lang + "." + element.key,
                        element[lang] || element.key,
                        Object
                    )
                }
            }
        )
    );
    return result;
};

const toJson = o => JSON.stringify(o, null, 2);

const toJS = o => `export default ${toJson(o)};`;

const format = o => {
    switch (argv.format) {
        case "js":
            return toJS(o);
        case "json":
            return toJson(o);
        default:
            throw `Unknown output format ${argv.format}`;
    }
};

const output = str => {
    switch (argv.output) {
        case "stdout":
            console.log(str);
            return;
        default:
            console.log("Writing result to", argv.output);
            fs.writeFileSync(argv.output, str, "utf-8");
    }
};

fetchCSV()
    .then(parseCsv)
    .then(withLangs)
    .then(buildObject)
    .then(format)
    .then(output)
    .catch(err => console.log(err));
