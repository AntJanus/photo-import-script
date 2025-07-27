import React from 'react';
import { Text, Box } from 'ink';
import { TextInput } from '@inkjs/ui';

export const SelectSource = ({ data, onUpdate, onNext }) => {
  return (
    <>
      <Box>
        <TextInput
          placeholder="Source folder"
          onSubmit={(val) => {
            onUpdate('sourcePath', val);
            onNext();
          }}
        />
      </Box>
    </>
  );
};
