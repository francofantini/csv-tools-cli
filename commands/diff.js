const csv = require('csv-parser');
const fs = require('fs');
const { saveToFile } = require('../lib/utils/utils');
const Logger = require('../lib/utils/logger');
const progressBar = require('../lib/utils/progress');
const hash = require('object-hash');

const getHash = value => hash.MD5(value);

const arrayToMap = (arr, progress) => {
    return arr.reduce((map, obj) => {
        const h = getHash(obj);
        map[h] = true;
        progress.tick();
        return map;
    }, {});
};

const getDiff = (dataA, dataB, progress) => {
    const aMap = arrayToMap(dataA, progress);

    return dataB.filter(obj => {
        const h = getHash(obj);
        progress.tick();
        return !aMap[h];
    });
};

const diff = argv => {
    const { fileA, fileB, outFile, verbose, progress: progressEnabled } = argv;

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

    Logger.log('Loading files', verbose);
    const readFileAPromiseA = readFile(fileA);
    const readFileAPromiseB = readFile(fileB);

    Promise.all([readFileAPromiseA, readFileAPromiseB]).then(res => {
        const [dataA, dataB] = res;

        Logger.log(
            'File A: ' +
                dataB.length +
                ' rows \nFile B: ' +
                dataB.length +
                ' rows',
            verbose
        );

        const progress = progressBar(
            dataB.length + dataB.length,
            progressEnabled
        );

        const diff = getDiff(dataA, dataB, progress);
        Logger.log('Diff: ' + diff.length + ' rows', verbose);

        if (outFile) saveToFile(outFile, diff);
        else console.log(diff);
    });
};

module.exports = diff;
