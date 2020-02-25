const { parse } = require('json2csv');
const fs = require('fs');

const saveToFile = (filename, data) => {
    try {
        const filteredData = data.filter(d => !(d === undefined || d === null));
        const csv = parse(filteredData, { header: true });
        fs.writeFileSync(filename, csv);
    } catch (err) {
        console.error(err);
    }
};

module.exports = {
    saveToFile
};
