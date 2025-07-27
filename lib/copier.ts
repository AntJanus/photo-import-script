import { log } from './logger.js';
import path from 'node:path';
import untildify from 'untildify';
import { mkdirSync, readdirSync, copyFileSync, statSync } from 'node:fs';
import { formatDate } from './date-formatter.js';

interface CopyPhotosOptions {
  input?: string;
  output?: string;
  dryRun?: boolean;
  format?: string;
}

export const copyPhotos = ({
  input,
  output,
  dryRun,
  format,
}: CopyPhotosOptions): void => {
  log('creating output directory', output);
  if (dryRun !== true && output) {
    mkdirSync(output, { recursive: true });
  }

  log('Reading input', input);
  if (!input) {
    log('No input directory specified');
    return;
  }

  const inputPath = path.resolve(untildify(input));
  const allFiles = readdirSync(inputPath, {
    withFileTypes: true,
    recursive: true,
  });

  log('Read: ', allFiles.length, 'files from directory');

  log('Copying files...', new Date());
  for (const file of allFiles) {
    const fullPath = path.resolve(file.parentPath, file.name);
    const metadata = statSync(fullPath);
    const createdAt = new Date(metadata.mtime);

    const dateObj = formatDate(createdAt);
    const folderPath = path.resolve(
      output || '',
      dateObj[0],
      dateObj[1],
      dateObj.join('')
    );

    if (dryRun !== true) {
      mkdirSync(folderPath, { recursive: true });
    }

    const filePath = path.resolve(folderPath, file.name);

    if (dryRun !== true) {
      copyFileSync(fullPath, filePath);
    }
  }

  log('Finished copying files', new Date());
};
