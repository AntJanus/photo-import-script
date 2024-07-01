import { parseArgs } from 'node:util';
import path from 'node:path';
import { mkdirSync, readdirSync, copyFileSync, statSync } from 'node:fs';

var args = process.argv;

const [,, cliArgs] = args

const log = (...args) => console.log(...args)
const formatDate = (date) => {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('');
}

const { values } = parseArgs({
  options: {
    input: {
      type: 'string',
      short: 'i'
    },
    output: {
      type: 'string',
      short: 'o'
    },
    format: {
      type: 'string',
      short: 'f'
    },
    dryRun: {
      type: 'boolean',
      short: 'd'
    }
  }
})

const input = values.input
const output = values.output
const format = values.format
const dryRun = values.dryRun

console.log('Dry run?', dryRun)

log('creating directory', output)
mkdirSync(output, { recursive: true})

log('Reading input', input)
const allFiles = readdirSync(input, {
  withFileTypes: true,
  recursive: true,
})

log('Read: ', allFiles.length, 'files from directory')

log('Copying files...')
for (const file of allFiles) {
  console.log('File: ', file)
  const fullPath = path.resolve(file.path, file.name)
  const metadata = statSync(fullPath)
  const createdAt = new Date(metadata.ctime)

  log('Creating folder: ', formatDate(createdAt))
  const folderName = formatDate(createdAt);
  const folderPath = path.resolve(output, folderName)

  if (dryRun === true) {
    mkdirSync(folderPath, { recursive: true})
  }

  const filePath = path.resolve(folderPath, file.name)

  log('Copying file', file.name, 'to path', filePath)

  if (dryRun === true) {
    copyFileSync(fullPath, filePath)
  }
}

