import React from 'react';
import { VoicePreset } from '../types';

interface VoiceSelectorProps {
  voices: VoicePreset[];
  selectedVoice: string;
  onSelectVoice: (voice: string) => void;
}

const VoiceSelector: React.FC<VoiceSelectorProps> = ({ voices, selectedVoice, onSelectVoice }) => {
  return (
    <div>
      <label htmlFor="voice-selector" className="block text-sm font-medium text-gray-400 mb-1">
        Voice Preset
      </label>
      <select
        id="voice-selector"
        name="voice-selector"
        className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-150 ease-in-out"
        value={selectedVoice}
        onChange={(e) => onSelectVoice(e.target.value)}
      >
        {voices.map((voice) => (
          <option key={voice.name} value={voice.value}>
            {voice.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default VoiceSelector;
