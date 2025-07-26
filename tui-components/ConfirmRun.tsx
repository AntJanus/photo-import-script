import React from 'react';
import { Text, Box } from 'ink';
import { ConfirmInput } from '@inkjs/ui';

interface ConfirmRunProps {
  onConfirm: () => void;
}

export const ConfirmRun = ({ onConfirm }: ConfirmRunProps) => {
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
