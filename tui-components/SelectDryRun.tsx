import React from 'react';
import { Text, Box } from 'ink';
import { ConfirmInput } from '@inkjs/ui';

export const SelectDryRun = ({ data, onUpdate, onNext }) => {
  return (
    <>
      <Box>
        <ConfirmInput
          onConfirm={() => {
            onUpdate('isDryRun', true);
            onNext();
          }}
          onCancel={() => {
            onUpdate('isDryRun', false);
            onNext();
          }}
        />
      </Box>
    </>
  );
};
