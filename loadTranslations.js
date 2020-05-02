#!/usr/bin/env node
const isNotLanguage = ['key'];

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
    langs: Object.keys(data[0]).filter(k => k != "" && !isNotLanguage.includes(k))
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

const output = o => {
    console.log(typeof o);
    for (var language in o) {
        if(language === 'topics') {
            write(formatTopics(o[language]), argv.output + "topics.json")
        } else {
            write(o[language], argv.output + language + ".json")
        }

    }
};

const formatTopics = (o) => {
    for(var key in o) {
        o[key] = {
            topics: o[key].split(',')
        };
    }
    return o;
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
