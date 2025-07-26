import React, { useState } from 'react';
import { render, Text, Box, useInput } from 'ink';
import { copyPhotos } from './lib/copier.js';
import { SelectSource } from './tui-components/SelectSource.js';
import { SelectDestination } from './tui-components/SelectDestination.js';
import { SelectDryRun } from './tui-components/SelectDryRun.js';
import { ConfirmRun } from './tui-components/ConfirmRun.js';

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
      <Box flexDirection="column" gap={1}>
        <SelectSource />
        <SelectDestination />
        <SelectDryRun />
        <ConfirmRun />
      </Box>
    </>
  );
};

render(<App />);
