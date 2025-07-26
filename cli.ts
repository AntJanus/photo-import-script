import { parseArgs } from 'node:util';
import { log } from './lib/logger';
import { showHelp } from './lib/help';
import { copyPhotos } from './lib/copier';

const args = process.argv;

const [, , cliArgs] = args;

const { values } = parseArgs({
  options: {
    input: {
      type: 'string',
      short: 'i',
    },
    output: {
      type: 'string',
      short: 'o',
    },
    format: {
      type: 'string',
      short: 'f',
    },
    dryRun: {
      type: 'boolean',
      short: 'd',
    },
    help: {
      type: 'boolean',
      short: 'h',
    },
  },
});

const input = values.input;
const output = values.output;
const format = values.format;
const dryRun = values.dryRun;
const help = values.help;

if (help) {
  showHelp();
  process.exit(0);
}

log('Is dry run?', !!dryRun);

copyPhotos({
  input,
  output,
  format,
  dryRun,
});
