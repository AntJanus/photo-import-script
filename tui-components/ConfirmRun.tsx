import React from 'react';
import { Text, Box } from 'ink';
import { ConfirmInput } from '@inkjs/ui';

export const ConfirmRun = ({ data, onUpdate, onNext }) => {
  return (
    <>
      <Box>
        <ConfirmInput
          onConfirm={() => {
            onUpdate('shouldRun', true);
            onNext();
          }}
          onCancel={() => {
            console.log('Action cancelled');
            process.exit(0);
          }}
        />
      </Box>
    </>
  );
};
