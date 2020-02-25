const { parse } = require('json2csv');
const fs = require('fs');
const csv = require('csv-parser');

const saveToFile = (filename, data) => {
    try {
        const filteredData = data.filter(d => !(d === undefined || d === null));
        const csv = parse(filteredData, { header: true });
        fs.writeFileSync(filename, csv);
    } catch (err) {
        console.error(err);
    }
};

const readFile = filename => {
    const rows = [];
    return new Promise(resolve => {
        fs.createReadStream(filename)
            .pipe(csv())
            .on('data', data => rows.push(data))
            .on('end', () => {
                resolve(rows);
            });
    });
};

module.exports = {
    saveToFile,
    readFile
};
