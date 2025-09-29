import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

/**
 * @module CodeEditor
 */

/**
 * A component that provides a simple code editor with syntax highlighting,
 * line numbers, and controls for compiling and running code. It is designed
 * for the platform demo to simulate a real IDE experience.
 *
 * @param {object} props - The properties for the component.
 * @param {object|null} props.selectedFile - The file object to be displayed in the editor.
 * @param {Function} props.onCodeChange - A callback function executed when the code in the editor changes.
 * @param {Function} props.onCompile - A callback function to handle the compile action.
 * @param {Function} props.onRun - A callback function to handle the run action.
 * @param {boolean} props.isCompiling - A flag indicating if the code is currently compiling.
 * @param {boolean} props.isRunning - A flag indicating if the code is currently running.
 * @returns {JSX.Element} The rendered code editor component.
 */
const CodeEditor = ({ selectedFile, onCodeChange, onCompile, onRun, isCompiling, isRunning }) => {
  const [code, setCode] = useState('');
  const [lineNumbers, setLineNumbers] = useState([]);

  useEffect(() => {
    if (selectedFile) {
      setCode(selectedFile.content);
    }
  }, [selectedFile]);

  useEffect(() => {
    const lines = code.split('\n');
    setLineNumbers(lines.map((_, index) => index + 1));
  }, [code]);

  const handleCodeChange = (e) => {
    const newCode = e.target.value;
    setCode(newCode);
    onCodeChange(newCode);
  };

  const syntaxHighlight = (code) => {
    // Simple syntax highlighting for Arduino/C++ code
    return code
      .replace(/(#include|#define|void|int|float|char|bool|String|const|return|if|else|for|while|switch|case|break|continue)/g, '<span class="text-blue-400">$1</span>')
      .replace(/(setup|loop|pinMode|digitalWrite|digitalRead|analogRead|analogWrite|delay|Serial|begin|print|println)/g, '<span class="text-green-400">$1</span>')
      .replace(/(".*?")/g, '<span class="text-yellow-400">$1</span>')
      .replace(/(\/\/.*$)/gm, '<span class="text-gray-500">$1</span>')
      .replace(/(\d+)/g, '<span class="text-purple-400">$1</span>');
  };

  if (!selectedFile) {
    return (
      <div className="bg-surface rounded-lg border border-border h-full flex items-center justify-center">
        <div className="text-center">
          <Icon name="FileCode" size={48} className="text-text-secondary mx-auto mb-4" />
          <h3 className="text-lg font-medium text-text-primary mb-2">No File Selected</h3>
          <p className="text-text-secondary">Select a project and file from the explorer to start coding</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface rounded-lg border border-border h-full flex flex-col">
      {/* Editor Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <Icon name="FileCode" size={18} className="text-primary" />
          <div>
            <h3 className="font-semibold text-text-primary">{selectedFile.name}</h3>
            <p className="text-xs text-text-secondary">Arduino C++ • Cloud IDE</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Play"
            iconPosition="left"
            onClick={onCompile}
            disabled={isCompiling || isRunning}
            className="text-xs"
          >
            {isCompiling ? 'Compiling...' : 'Compile'}
          </Button>
          <Button
            variant="primary"
            size="sm"
            iconName="Zap"
            iconPosition="left"
            onClick={onRun}
            disabled={isCompiling || isRunning}
            className="text-xs bg-accent hover:bg-accent/90"
          >
            {isRunning ? 'Running...' : 'Run'}
          </Button>
        </div>
      </div>

      {/* Code Editor */}
      <div className="flex-1 flex">
        {/* Line Numbers */}
        <div className="bg-background border-r border-border p-4 text-right min-w-[60px]">
          {lineNumbers.map((num) => (
            <div key={num} className="text-xs text-text-secondary font-code leading-6">
              {num}
            </div>
          ))}
        </div>

        {/* Code Area */}
        <div className="flex-1 relative">
          <textarea
            value={code}
            onChange={handleCodeChange}
            className="w-full h-full p-4 bg-transparent text-text-primary font-code text-sm leading-6 resize-none outline-none"
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
            spellCheck={false}
            placeholder="// Start coding your embedded project here..."
          />
          
          {/* Syntax Highlighting Overlay (Visual Only) */}
          <div 
            className="absolute inset-0 p-4 pointer-events-none font-code text-sm leading-6 whitespace-pre-wrap"
            style={{ 
              fontFamily: 'JetBrains Mono, monospace',
              color: 'transparent'
            }}
            dangerouslySetInnerHTML={{ __html: syntaxHighlight(code) }}
          />
        </div>
      </div>

      {/* Editor Footer */}
      <div className="flex items-center justify-between p-3 border-t border-border bg-background/50">
        <div className="flex items-center space-x-4 text-xs text-text-secondary">
          <span>Line {code.split('\n').length}</span>
          <span>Characters {code.length}</span>
          <div className="flex items-center space-x-1">
            <Icon name="Wifi" size={12} className="text-success" />
            <span>Connected</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 text-xs text-text-secondary">
          <span>Arduino C++</span>
          <div className="w-1 h-1 bg-text-secondary rounded-full"></div>
          <span>UTF-8</span>
          <div className="w-1 h-1 bg-text-secondary rounded-full"></div>
          <span>Auto-save enabled</span>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;