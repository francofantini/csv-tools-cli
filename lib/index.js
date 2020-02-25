const diff = require('../commands/diff');
const length = require('../commands/length');
const yargs = require('yargs');

const _ = yargs
    .usage('Usage: $0 [command]')
    .demandCommand()
    .command(
        'diff fileA fileB [outFile]',
        'Get the diff between file A and B.',
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
            yargs.option('progress', {
                alias: 'p',
                type: 'boolean',
                description: 'Run with progress bar'
            });
        },
        argv => {
            diff(argv);
        }
    )
    .command(
        'length file',
        'Get the length of a file.',
        yargs => {
            yargs.positional('file', {
                describe: 'File'
            });
        },
        argv => {
            length(argv);
        }
    )
    .strict(true)
    .option('verbose', {
        alias: 'v',
        type: 'boolean',
        description: 'Run with verbose logging'
    })

    .help('h')
    .alias('h', 'help').argv;
