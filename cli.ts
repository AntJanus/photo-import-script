import { parseArgs } from "node:util";
import log from './lib/logger.js';
import { copyPhotos } from './lib/copier.js';

function showHelp(): void {
  console.log(`
Photo Import Script

Usage: npm run cli [options]

Options:
  -i, --input <path>    Input directory containing photos to import (required)
  -o, --output <path>   Output directory where photos will be organized (required)
  -f, --format <format> Date format for organizing photos (currently unused)
  -d, --dryRun          Preview what would be copied without actually copying files
  -h, --help            Show this help message

Description:
  This script organizes photos from an input directory into a structured output directory.
  Photos are organized by date using the format: YYYY/MM/YYYYMMDD/
  The date is extracted from the file's modification time.

Examples:
  npm run cli -- --input ./photos --output ./organized
  npm run cli -- -i ./photos -o ./organized --dryRun
  npm run cli -- --help
`);
}

const args = process.argv;

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
    help: {
      type: "boolean",
      short: "h",
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

log('Is dry run?', dryRun)

copyPhotos({
  input,
  output,
  format,
  dryRun
})
