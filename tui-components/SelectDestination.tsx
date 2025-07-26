import React from 'react';
import { Text, Box } from 'ink';
import { TextInput } from '@inkjs/ui';

interface SelectDestinationProps {
  setDestinationPath: (path: string) => void;
}

export const SelectDestination = ({
  setDestinationPath,
}: SelectDestinationProps) => {
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
