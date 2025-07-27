import React, { useState } from 'react';
import { render, Text, Box, useInput } from 'ink';
import { copyPhotos } from './lib/copier.js';
import { SelectSource } from './tui-components/SelectSource.js';
import { SelectDestination } from './tui-components/SelectDestination.js';
import { SelectDryRun } from './tui-components/SelectDryRun.js';
import { ConfirmRun } from './tui-components/ConfirmRun.js';

const App = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    sourcePath: '',
    destinationPath: '',
    isDryRun: false,
    shouldRun: false,
  });

  const prevStep = () => setCurrentStep((prev) => prev - 1);
  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const onUpdate = (key, value) => {
    setFormData((data) => {
      data[key] = value;

      return data;
    });
  };

  const steps = [
    { component: SelectSource, title: 'Select photo source' },
    { component: SelectDestination, title: 'Select photo destination' },
    { component: SelectDryRun, title: 'Is dry run?' },
    {
      component: ConfirmRun,
      title: 'Are you sure you want to run the import?',
    },
  ];


  useInput((input, key) => {
    if (input === 'q') {
      process.exit(0);
    }
  });

  if (formData.shouldRun) {
    copyPhotos({
      input: formData.sourcePath,
      output: formData.destinationPath,
      dryRun: formData.isDryRun,
    })
    return (
      <>
        <Text>Run!</Text>
      </>
    );
  }

  const currentStepDefinition = steps[currentStep]
  const CurrentStepComponent = currentStepDefinition.component;
  const title = currentStepDefinition.title;

  return (
    <>
      <Text bold>Photo Importer TUI</Text>
      <Box flexDirection="column" gap={1}>
        <Text>{title}</Text>
        <CurrentStepComponent
          data={formData}
          onUpdate={onUpdate}
          onNext={nextStep}
          onPrev={prevStep}
        />
      </Box>
    </>
  );
};

render(<App />);
