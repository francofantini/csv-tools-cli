const diff = require('./commands/diff');
const yargs = require('yargs');

const _ = yargs
    .command(
        'diff fileA fileB [outFile]',
        'Get de diff between file A and B.',
        yargs => {
            yargs.positional('fileA', {
                describe: 'File A'
            });
            yargs.positional('fileB', {
                describe: 'File B'
            });
            yargs.positional('outFile', {
                describe: 'Output File'
            });
            yargs.option('outFile', {
                describe: 'Output File'
            });
        },
        argv => {
            diff(argv);
        }
    )
    .option('verbose', {
        alias: 'v',
        type: 'boolean',
        description: 'Run with verbose logging'
    })
    .option('progress', {
        alias: 'p',
        type: 'boolean',
        description: 'Run with progress bar'
    }).argv;
