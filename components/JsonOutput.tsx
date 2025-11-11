import React, { useState } from 'react';
import { Dialogue } from '../types';
import { CopyIcon } from './icons';

interface JsonOutputProps {
  dialogue: Dialogue;
}

const JsonOutput: React.FC<JsonOutputProps> = ({ dialogue }) => {
  const [copied, setCopied] = useState(false);
  const jsonString = JSON.stringify({ dialogue }, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="mt-6 bg-gray-900/50 p-4 rounded-lg border border-gray-700 relative">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold text-gray-300">JSON Output</h3>
        <button
          onClick={handleCopy}
          className="px-3 py-1 text-sm bg-gray-700 hover:bg-gray-600 rounded-md text-gray-300 flex items-center gap-2 transition"
          aria-label="Copy JSON to clipboard"
        >
          <CopyIcon className="w-4 h-4" />
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="text-sm text-orange-300 bg-transparent rounded-md p-2 overflow-x-auto">
        <code>{jsonString}</code>
      </pre>
    </div>
  );
};

export default JsonOutput;
