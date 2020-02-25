const { readFile } = require('../lib/utils/utils');
const Logger = require('../lib/utils/logger');

const length = argv => {
    const { file, verbose } = argv;

    readFile(file).then(data => {
        if (verbose)
            Logger.log(
                'File ' + file + ' has ' + data.length + ' rows.',
                verbose
            );
        else Logger.log(data.length, true);
    });
};

module.exports = length;
