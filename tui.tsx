import React, { useState } from 'react';
import { render, Text, Box, useInput } from 'ink';
import { copyPhotos } from './lib/copier.js';

const App = () => {
  return (
    <>
      <Text bold>Photo Importer TUI</Text>
      <Box>
        <Box>
          <Text>What photos would you like to import?</Text>
        </Box>
        <Box>
          <Text>Source folder:</Text>
        </Box>
        <Box>
          <Text>Destination folder: </Text>
        </Box>
        <Box>
          <Text>Is this a dry run?</Text>
        </Box>
      </Box>
    </>
  );
};

render(<App />);
