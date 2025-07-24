# Photo Importer

A Node.js command-line tool for organizing photos by automatically copying them into date-based directory structures based on their modification timestamps.

## Features

- **Date-based Organization**: Automatically organizes photos into folders structured as `YYYY/MM/YYYYMMDD/`
- **Recursive Directory Processing**: Processes all files in subdirectories of the input folder
- **Dry Run Mode**: Preview what changes will be made without actually copying files
- **Cross-platform**: Works on Windows, macOS, and Linux

## Installation

Clone the repository and ensure you have Node.js installed:

```bash
git clone <repository-url>
cd photo-import-script
```

## Usage

Run the photo importer using the CLI:

```bash
yarn cli -i <input-directory> -o <output-directory> [options]
```

### Command Line Options

- `-i, --input <path>`: Input directory containing photos to organize (required)
- `-o, --output <path>`: Output directory where organized photos will be copied (required)
- `-f, --format <format>`: Format option (reserved for future use)
- `-d, --dryRun`: Run in dry-run mode to preview changes without copying files

### Examples

**Basic usage:**
```bash
yarn cli -i ./unsorted-photos -o ./organized-photos
```

**Dry run to preview changes:**
```bash
yarn cli -i ./unsorted-photos -o ./organized-photos -d
```

## How It Works

1. **Input Processing**: The tool recursively scans the input directory for all files
2. **Date Extraction**: Uses each file's modification time (`mtime`) to determine the creation date
3. **Directory Structure**: Creates a hierarchical folder structure:
   ```
   output-directory/
   ├── 2023/
   │   ├── 01/
   │   │   └── 20230115/
   │   │       ├── photo1.jpg
   │   │       └── photo2.png
   │   └── 02/
   │       └── 20230203/
   │           └── photo3.jpg
   └── 2024/
       └── 03/
           └── 20240310/
               └── photo4.jpg
   ```
4. **File Copying**: Copies files to their respective date-based directories

## Project Structure

```
photo-import-script/
├── cli.js              # Command-line interface and argument parsing
├── copier.js           # Main photo copying and organization logic
├── date-formatter.js   # Date formatting utilities
├── logger.js           # Simple logging utility
├── package.json        # Project configuration and dependencies
└── README.md          # This file
```

## Technical Details

- **Node.js Version**: Uses ES modules (`"type": "module"`)
- **Dependencies**: Built using only Node.js built-in modules (no external dependencies)
- **File Operations**: Uses Node.js `fs` module for file system operations
- **Path Handling**: Uses `node:path` for cross-platform path operations

## Development

The project uses Yarn as the package manager. Available scripts:

```bash
# Run the CLI
yarn cli

# Test (not implemented yet)
yarn test
```

## Author

Antonin Januska

## License

Private