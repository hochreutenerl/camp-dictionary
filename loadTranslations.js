#!/usr/bin/env node
const isNotLanguage = ['key', 'topics', 'link'];

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
    langs: Object.keys(data[0]).filter(k => k !== "" && !isNotLanguage.includes(k))
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
    data.forEach(element =>
        isNotLanguage.forEach(attribute => {
                if (element[attribute] && attribute !== "key") {
                    if(attribute === "topics") {
                        element[attribute] = element[attribute].replace(/ /g, '').split(',');
                    }
                    _.setWith(
                        result,
                        "topics." + element.key + "." + attribute,
                        element[attribute] || element.key,
                        Object
                    )
                }
            }
        )
    );

    return result;
};

const output = o => {
    console.log(typeof o);
    for (var language in o) {
        write(o[language], argv.output + language + ".json")
    }
};

const write = (o, filename) => {
    var str = JSON.stringify(o, null, 2);
    console.log("Writing result to", filename);
    fs.writeFileSync(filename, str, "utf-8");
};


fetchCSV()
    .then(parseCsv)
    .then(withLangs)
    .then(buildObject)
    .then(output)
    .catch(err => console.log(err));
