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

const VIDEO_EXTENSIONS = [
  '.mp4',
  '.mov',
  '.avi',
  '.mkv',
  '.wmv',
  '.flv',
  '.m4v',
  '.webm',
  '.3gp',
];

const isVideoFile = (filename: string): boolean => {
  const ext = path.extname(filename).toLowerCase();
  return VIDEO_EXTENSIONS.includes(ext);
};

export const copyPhotos = ({
  input,
  output,
  dryRun,
  format,
}: CopyPhotosOptions): void => {
  const outputPath = path.resolve(untildify(output));
  const inputPath = path.resolve(untildify(input));

  log('creating output directory', outputPath);
  if (dryRun !== true && outputPath) {
    mkdirSync(outputPath, { recursive: true });
  }

  log('Reading input', input);
  if (!input) {
    log('No input directory specified');
    return;
  }

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

    // Determine folder path based on file type
    let folderPath: string;
    if (isVideoFile(file.name)) {
      // Videos go into YYYY/MM/videos/
      folderPath = path.resolve(
        outputPath || '',
        dateObj[0],
        dateObj[1],
        'videos'
      );
    } else {
      // Pictures go into YYYY/MM/YYYYMMDD/
      folderPath = path.resolve(
        outputPath || '',
        dateObj[0],
        dateObj[1],
        dateObj.join('')
      );
    }

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
