import React, { useState } from 'react';
import { render, Text, Box, useInput } from 'ink';
import { copyPhotos } from './lib/copier.js';

interface AppState {
  screen: 'setup' | 'running' | 'completed';
  inputDir: string;
  outputDir: string;
  dryRun: boolean;
  selectedField: 'input' | 'output' | 'dryrun' | 'execute';
  logs: string[];
}

const FIELDS = ['input', 'output', 'dryrun', 'execute'] as const;

const App = () => {
  const [state, setState] = useState<AppState>({
    screen: 'setup',
    inputDir: '',
    outputDir: '',
    dryRun: false,
    selectedField: 'input',
    logs: []
  });

  const navigateField = (direction: 'up' | 'down') => {
    const currentIndex = FIELDS.indexOf(state.selectedField);
    const nextIndex = direction === 'up' 
      ? (currentIndex - 1 + FIELDS.length) % FIELDS.length
      : (currentIndex + 1) % FIELDS.length;
    setState(prev => ({ ...prev, selectedField: FIELDS[nextIndex] }));
  };

  const handleTextInput = (input: string) => {
    if (state.selectedField === 'input') {
      setState(prev => ({ ...prev, inputDir: prev.inputDir + input }));
    } else if (state.selectedField === 'output') {
      setState(prev => ({ ...prev, outputDir: prev.outputDir + input }));
    }
  };

  const handleBackspace = () => {
    if (state.selectedField === 'input') {
      setState(prev => ({ ...prev, inputDir: prev.inputDir.slice(0, -1) }));
    } else if (state.selectedField === 'output') {
      setState(prev => ({ ...prev, outputDir: prev.outputDir.slice(0, -1) }));
    }
  };

  useInput((input, key) => {
    if (key.ctrl && input === 'c') {
      process.exit(0);
    }

    if (state.screen !== 'setup') return;

    if (key.upArrow) {
      navigateField('up');
    } else if (key.downArrow) {
      navigateField('down');
    } else if (key.return) {
      if (state.selectedField === 'execute' && state.inputDir && state.outputDir) {
        executePhotoImport();
      } else if (state.selectedField === 'dryrun') {
        setState(prev => ({ ...prev, dryRun: !prev.dryRun }));
      }
    } else if (key.backspace) {
      handleBackspace();
    } else if (input && (state.selectedField === 'input' || state.selectedField === 'output')) {
      handleTextInput(input);
    }
  });

  const executePhotoImport = () => {
    setState(prev => ({ ...prev, screen: 'running', logs: ['Starting photo import...'] }));
    
    setTimeout(() => {
      try {
        copyPhotos({
          input: state.inputDir,
          output: state.outputDir,
          dryRun: state.dryRun
        });
        
        setState(prev => ({ 
          ...prev, 
          screen: 'completed',
          logs: [...prev.logs, 'Photo import completed successfully!']
        }));
      } catch (error) {
        setState(prev => ({ 
          ...prev, 
          screen: 'completed',
          logs: [...prev.logs, `Error: ${error instanceof Error ? error.message : String(error)}`]
        }));
      }
    }, 100);
  };

  const FieldRow = ({ field, label, value, color }: { field: string; label: string; value: string; color?: string }) => (
    <Box>
      <Text color={state.selectedField === field ? 'yellow' : 'white'}>
        {state.selectedField === field ? '▶ ' : '  '}
      </Text>
      <Text>{label}: </Text>
      <Text color={color || 'green'}>{value}</Text>
    </Box>
  );

  if (state.screen === 'setup') {
    const canExecute = state.inputDir && state.outputDir;
    
    return (
      <Box flexDirection="column" padding={1}>
        <Text color="cyan" bold>📸 Photo Import Tool</Text>
        <Text> </Text>
        
        <FieldRow 
          field="input" 
          label="Input Directory" 
          value={state.inputDir || '<empty>'} 
        />
        
        <FieldRow 
          field="output" 
          label="Output Directory" 
          value={state.outputDir || '<empty>'} 
        />
        
        <Box>
          <Text color={state.selectedField === 'dryrun' ? 'yellow' : 'white'}>
            {state.selectedField === 'dryrun' ? '▶ ' : '  '}
          </Text>
          <Text>Dry Run: </Text>
          <Text color={state.dryRun ? 'green' : 'red'}>
            {state.dryRun ? '✓ Enabled' : '✗ Disabled'}
          </Text>
          <Text dimColor> (Enter to toggle)</Text>
        </Box>
        
        <Text> </Text>
        
        <Box>
          <Text color={state.selectedField === 'execute' ? 'yellow' : 'gray'}>
            {state.selectedField === 'execute' ? '▶ ' : '  '}
          </Text>
          <Text color={canExecute ? 'green' : 'gray'} bold>
            {canExecute ? 'Execute Import' : 'Execute Import (missing directories)'}
          </Text>
        </Box>
        
        <Text> </Text>
        <Text dimColor>↑/↓ navigate • type paths • Enter execute/toggle • Ctrl+C exit</Text>
      </Box>
    );
  }

  const ResultScreen = ({ title, status }: { title: string; status: 'running' | 'completed' }) => (
    <Box flexDirection="column" padding={1}>
      <Text color="cyan" bold>📸 {title}</Text>
      <Text> </Text>
      
      {status === 'running' ? (
        <Text color="yellow">Executing photo import...</Text>
      ) : (
        <Text color="green" bold>Import process finished!</Text>
      )}
      
      <Text dimColor>Input: {state.inputDir}</Text>
      <Text dimColor>Output: {state.outputDir}</Text>
      <Text dimColor>Dry Run: {state.dryRun ? 'Yes' : 'No'}</Text>
      <Text> </Text>
      
      <Text color="cyan">Output:</Text>
      <Box flexDirection="column" borderStyle="single" paddingX={1}>
        {state.logs.map((log, index) => (
          <Text key={index}>{log}</Text>
        ))}
        {state.logs.length === 0 && <Text dimColor>Waiting for output...</Text>}
      </Box>
      
      {status === 'completed' && (
        <>
          <Text> </Text>
          <Text dimColor>Press Ctrl+C to exit</Text>
        </>
      )}
    </Box>
  );

  if (state.screen === 'running') {
    return <ResultScreen title="Photo Import Tool - Running" status="running" />;
  }

  if (state.screen === 'completed') {
    return <ResultScreen title="Photo Import Tool - Completed" status="completed" />;
  }
};

render(<App />);
