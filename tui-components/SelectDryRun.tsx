import React from 'react';
import { Text, Box } from 'ink';
import { ConfirmInput } from '@inkjs/ui';

interface SelectDryRunProps {
  setDryRun: (dryRun: boolean) => void;
}

export const SelectDryRun = ({ setDryRun }: SelectDryRunProps) => {
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
