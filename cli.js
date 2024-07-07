import { parseArgs } from "node:util";
import log from './logger.js';
import { copyPhotos } from './copier.js';

var args = process.argv;

const [, , cliArgs] = args;

const { values } = parseArgs({
  options: {
    input: {
      type: "string",
      short: "i",
    },
    output: {
      type: "string",
      short: "o",
    },
    format: {
      type: "string",
      short: "f",
    },
    dryRun: {
      type: "boolean",
      short: "d",
    },
  },
});

const input = values.input;
const output = values.output;
const format = values.format;
const dryRun = values.dryRun;

log('Is dry run?', dryRun)

copyPhotos({
  input,
  output,
  format,
  dryRun
})

