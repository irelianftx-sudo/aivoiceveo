import React from 'react';
import { ToneTemplate } from '../types';

interface ToneSelectorProps {
  tones: ToneTemplate[];
  selectedTone: string;
  onSelectTone: (tone: string) => void;
}

const ToneSelector: React.FC<ToneSelectorProps> = ({ tones, selectedTone, onSelectTone }) => {
  return (
    <div>
      <label htmlFor="tone-selector" className="block text-sm font-medium text-gray-400 mb-1">
        Tone Template
      </label>
      <select
        id="tone-selector"
        name="tone-selector"
        className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-150 ease-in-out"
        value={selectedTone}
        onChange={(e) => onSelectTone(e.target.value)}
      >
        {tones.map((tone) => (
          <option key={tone.name} value={tone.value}>
            {tone.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ToneSelector;
