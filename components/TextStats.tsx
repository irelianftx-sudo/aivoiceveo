import React from 'react';
import Tooltip from './Tooltip';
import { InfoIcon } from './icons';

interface TextStatsProps {
  text: string;
}

const TextStats: React.FC<TextStatsProps> = ({ text }) => {
  const charCount = text.length;
  // Handle empty string case and multiple spaces
  const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  // Handle empty string case
  const lineCount = text.trim() === '' ? 0 : text.split('\n').length;

  const tooltipText = "O máximo de Caracteres é 150 para fala de 8 segundos no Veo3";

  return (
    <div className="flex items-center justify-end space-x-4 text-xs text-gray-400 mt-2 px-1">
      <div className="flex items-center space-x-1.5">
        <span>Caracteres: {charCount}</span>
        <Tooltip text={tooltipText}>
            <InfoIcon className="w-4 h-4 text-gray-500 cursor-help" />
        </Tooltip>
      </div>
      <span>Palavras: {wordCount}</span>
      <span>Linhas: {lineCount}</span>
    </div>
  );
};

export default TextStats;
