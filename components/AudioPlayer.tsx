
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { decode, decodeAudioData } from '../utils/audioUtils';
import { PlayIcon, PauseIcon } from './icons';

interface AudioPlayerProps {
  audioData: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioData }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioBufferRef = useRef<AudioBuffer | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);

  useEffect(() => {
    // Initialize AudioContext
    if (!audioContextRef.current) {
        try {
            audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        } catch (e) {
            console.error("Web Audio API is not supported in this browser.", e);
        }
    }

    // Decode audio data when it changes
    const decodeAndSetBuffer = async () => {
        if (audioData && audioContextRef.current) {
            try {
                const decodedBytes = decode(audioData);
                const buffer = await decodeAudioData(decodedBytes, audioContextRef.current, 24000, 1);
                audioBufferRef.current = buffer;
            } catch (e) {
                console.error("Failed to decode audio data", e);
            }
        }
    };
    decodeAndSetBuffer();
    
    // Cleanup on unmount
    return () => {
        sourceRef.current?.stop();
        // Do not close the context, as it might be reused.
    };
  }, [audioData]);

  const handlePlayPause = useCallback(() => {
    if (!audioContextRef.current || !audioBufferRef.current) return;

    if (isPlaying) {
      sourceRef.current?.stop();
      setIsPlaying(false);
    } else {
      // Resume context if it was suspended
      if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
      }

      const source = audioContextRef.current.createBufferSource();
      source.buffer = audioBufferRef.current;
      source.connect(audioContextRef.current.destination);
      source.onended = () => {
        setIsPlaying(false);
      };
      source.start();
      sourceRef.current = source;
      setIsPlaying(true);
    }
  }, [isPlaying]);

  return (
    <div className="mt-6 flex flex-col items-center justify-center bg-gray-800 p-6 rounded-lg border border-gray-700">
        <h3 className="text-lg font-semibold text-gray-300 mb-4">Generated Speech</h3>
        <button
            onClick={handlePlayPause}
            disabled={!audioBufferRef.current}
            className="flex items-center justify-center w-16 h-16 bg-orange-600 rounded-full text-white hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-orange-500 transition-transform duration-200 transform hover:scale-105 disabled:bg-gray-600 disabled:cursor-not-allowed"
            aria-label={isPlaying ? 'Pause' : 'Play'}
        >
            {isPlaying ? <PauseIcon className="w-8 h-8" /> : <PlayIcon className="w-8 h-8" />}
        </button>
    </div>
  );
};

export default AudioPlayer;
