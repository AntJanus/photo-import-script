import log from "./logger.js";
import path from "node:path";
import { mkdirSync, readdirSync, copyFileSync, statSync } from "node:fs";
import formatDate from "./date-formatter.js";

export const copyPhotos = ({ input, output, dryRun, format }) => {
  log("creating output directory", output);
  if (dryRun !== true) {
    mkdirSync(output, { recursive: true });
  }

  log("Reading input", input);
  const allFiles = readdirSync(input, {
    withFileTypes: true,
    recursive: true,
  });

  log("Read: ", allFiles.length, "files from directory");

  log("Copying files...", new Date());
  for (const file of allFiles) {
    const fullPath = path.resolve(file.path, file.name);
    const metadata = statSync(fullPath);
    const createdAt = new Date(metadata.mtime);

    const dateObj = formatDate(createdAt);
    const folderPath = path.resolve(
      output,
      dateObj[0],
      dateObj[1],
      dateObj.join(""),
    );

    if (dryRun !== true) {
      mkdirSync(folderPath, { recursive: true });
    }

    const filePath = path.resolve(folderPath, file.name);

    if (dryRun !== true) {
      copyFileSync(fullPath, filePath);
    }
  }

  log("Finished copying files", new Date());
};
