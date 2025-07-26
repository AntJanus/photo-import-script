import React from 'react';
import { Text, Box } from 'ink';
import { TextInput } from '@inkjs/ui';

interface SelectSourceProps {
  setSourcePath: (path: string) => void;
}

export const SelectSource = ({ setSourcePath }: SelectSourceProps) => {
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
