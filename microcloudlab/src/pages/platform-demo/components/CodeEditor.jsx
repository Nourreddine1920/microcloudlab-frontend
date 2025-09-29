import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

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

  const syntaxHighlight = (text) => {
    let highlightedText = text;
    // Highlight keywords
    highlightedText = highlightedText.replace(/\b(void|int|float|char|bool|String|const|return|if|else|for|while|switch|case|break|continue|pinMode|digitalWrite|digitalRead|analogRead|analogWrite|delay|Serial|begin|print|println)\b/g, '<span class="text-primary-400">$1</span>');
    // Highlight preprocessor directives
    highlightedText = highlightedText.replace(/(#include|#define)/g, '<span class="text-accent-400">$1</span>');
    // Highlight comments
    highlightedText = highlightedText.replace(/(\/\/.*$)/gm, '<span class="text-gray-500 italic">$1</span>');
    // Highlight strings
    highlightedText = highlightedText.replace(/(".*?")/g, '<span class="text-yellow-400">$1</span>');
    // Highlight numbers
    highlightedText = highlightedText.replace(/\b(\d+)\b/g, '<span class="text-purple-400">$1</span>');
    return highlightedText;
  };

  if (!selectedFile) {
    return (
      <div className="bg-gray-800/50 rounded-lg border border-border h-full flex items-center justify-center">
        <div className="text-center">
          <Icon name="FileCode" size={48} className="text-gray-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-300 mb-2">No File Selected</h3>
          <p className="text-gray-400">Select a project and file from the explorer to start coding</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 rounded-lg border border-border h-full flex flex-col shadow-2xl">
      {/* Editor Header */}
      <div className="flex items-center justify-between p-3 border-b border-gray-700 bg-gray-800/50 rounded-t-lg">
        <div className="flex items-center space-x-3">
          <Icon name="FileCode" size={20} className="text-primary" />
          <div>
            <h3 className="font-semibold text-white">{selectedFile.name}</h3>
            <p className="text-xs text-gray-400">Arduino C++ • MicroCloudLab IDE</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Check"
            iconPosition="left"
            onClick={onCompile}
            disabled={isCompiling || isRunning}
            className="text-xs !border-gray-600 hover:!bg-gray-700"
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
            className="text-xs bg-accent hover:bg-accent/90 text-black"
          >
            {isRunning ? 'Running...' : 'Run Program'}
          </Button>
        </div>
      </div>

      {/* Code Editor */}
      <div className="flex-1 flex overflow-hidden">
        {/* Line Numbers */}
        <div className="bg-gray-900 border-r border-gray-700 p-4 text-right min-w-[60px] overflow-y-auto">
          {lineNumbers.map((num) => (
            <div key={num} className="text-sm text-gray-500 font-mono leading-6">
              {num}
            </div>
          ))}
        </div>

        {/* Code Area */}
        <div className="flex-1 relative h-full">
          <textarea
            value={code}
            onChange={handleCodeChange}
            className="absolute inset-0 w-full h-full p-4 bg-transparent text-transparent caret-white font-mono text-sm leading-6 resize-none outline-none"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
            spellCheck={false}
            placeholder="// Start coding your embedded project here..."
          />
          
          <pre
            className="absolute inset-0 p-4 pointer-events-none font-mono text-sm leading-6 whitespace-pre-wrap overflow-auto"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
            dangerouslySetInnerHTML={{ __html: syntaxHighlight(code) }}
          />
        </div>
      </div>

      {/* Editor Footer */}
      <div className="flex items-center justify-between p-2 border-t border-gray-700 bg-gray-800/50 rounded-b-lg">
        <div className="flex items-center space-x-4 text-xs text-gray-400">
          <div className="flex items-center space-x-1">
            <Icon name="GitBranch" size={12} />
            <span>main</span>
          </div>
          <span>Line {code.split('\n').length}, Col {code.length % 80}</span>
          <div className="flex items-center space-x-1.5">
            <Icon name="CheckCircle" size={14} className="text-success" />
            <span>Ready</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-3 text-xs text-gray-400">
          <span>Arduino C++</span>
          <span>UTF-8</span>
          <div className="flex items-center space-x-1">
            <Icon name="Save" size={12} />
            <span>Auto-save on</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;