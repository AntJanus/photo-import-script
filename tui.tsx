import React, { useState } from 'react';
import { render, Text, Box, useInput } from 'ink';
import { TextInput } from '@inkjs/ui';
import { copyPhotos } from './lib/copier.js';

const SelectSource = ({ setSourcePath }) => {
  return (
    <>
      <Box>
        <Text>Source folder:</Text>
        <TextInput
          placeholder="Source folder"
          onSubmit={(val) => {
            setSourcePath(val);
          }}
        />
      </Box>
    </>
  );
};

const SelectDestination = ({ setDestinationPath }) => {
  return (
    <>
      <Box>
        <Text>Destination folder:</Text>
        <TextInput
          placeholder="Destination folder"
          onSubmit={(val) => {
            setDestinationPath(val);
          }}
        />
      </Box>
    </>
  );
};

const SelectDryrun = ({ setDryRun }) => {
  return (
    <>
      <Box>
        <Text>Is this a dry run?</Text>
        <ConfirmInput
          onConfirm={() => {
            setDryRun(true);
          }}
          onCancel={() => {
            setDryRun(false);
          }}
        />
      </Box>
    </>
  );
};

const ConfirmRun = ({ onConfirm }) => {
  return (
    <>
      <Box>
        <Text>Are you sure you want to import photos?</Text>
        <ConfirmInput
          onConfirm={onConfirm}
          onCancel={() => {
            console.log('Action cancelled');
            process.exit(0);
          }}
        />
      </Box>
    </>
  );
};

const App = () => {
  useInput((input, key) => {
    if (input === 'q') {
      process.exit(0);
    }
  });

  return (
    <>
      <Text bold>Photo Importer TUI</Text>
      <Box marginTop={1}>
        <Text>What photos would you like to import?</Text>
      </Box>
      <Box flexDirection="column" gap={1}></Box>
    </>
  );
};

render(<App />);
