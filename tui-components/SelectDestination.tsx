import React from 'react';
import { Text, Box } from 'ink';
import { TextInput } from '@inkjs/ui';

export const SelectDestination = ({ data, onUpdate, onNext }) => {
  return (
    <>
      <Box>
        <TextInput
          placeholder="Destination folder"
          onSubmit={(val) => {
            onUpdate('destinationPath', val);
            onNext();
          }}
        />
      </Box>
    </>
  );
};
