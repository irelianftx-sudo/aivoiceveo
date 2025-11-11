import React, { useState, useCallback } from 'react';
import { Dialogue } from './types';
import { generateSpeech } from './services/geminiService';
import { toneTemplates, voicePresets, initialText } from './constants';
import {
  EditableField,
  AudioPlayer,
  JsonOutput,
  ToneSelector,
  VoiceSelector,
  ToggleSwitch,
  TextStats
} from './components';
import { SpinnerIcon } from './components/icons';

function App() {
  const [language, setLanguage] = useState<string>("Brazilian Portuguese");
  const [accent, setAccent] = useState<string>("Clear Brazilian accent");
  const [verbatimText, setVerbatimText] = useState<string>(initialText);
  const [selectedTone, setSelectedTone] = useState<string>(toneTemplates[0].value);
  const [selectedVoice, setSelectedVoice] = useState<string>(voicePresets[0].value);
  const [generatedDialogue, setGeneratedDialogue] = useState<Dialogue | null>(null);
  const [audioData, setAudioData] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [generateVoice, setGenerateVoice] = useState<boolean>(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);
    setAudioData(null);

    const dialogueToGenerate: Dialogue = {
      language,
      accent,
      tone: selectedTone,
      verbatim_text: verbatimText,
    };

    setGeneratedDialogue(dialogueToGenerate);

    if (!generateVoice) {
      setIsGenerating(false);
      return;
    }

    try {
      const generatedAudio = await generateSpeech(dialogueToGenerate, selectedVoice);
      setAudioData(generatedAudio);
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred.');
      setAudioData(null);
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handleTextChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setVerbatimText(e.target.value);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <main className="w-full max-w-2xl mx-auto">
        <div className="bg-gray-800/50 backdrop-blur-sm shadow-2xl rounded-xl border border-gray-700 overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-orange-400">AI Voice Studio</h1>
              <p className="mt-2 text-md text-gray-400">Enter text, choose a tone, and generate speech with the corresponding JSON.</p>
            </div>
            
            <div className="mt-8 space-y-6">
              <EditableField
                  label="Linguagem"
                  name="language"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
              />
               <EditableField
                  label="Sotaque"
                  name="accent"
                  value={accent}
                  onChange={(e) => setAccent(e.target.value)}
              />
              <ToneSelector
                tones={toneTemplates}
                selectedTone={selectedTone}
                onSelectTone={setSelectedTone}
              />
              <VoiceSelector
                voices={voicePresets}
                selectedVoice={selectedVoice}
                onSelectVoice={setSelectedVoice}
              />
              <div>
                <EditableField
                  label="Text to Speak"
                  name="verbatim_text"
                  value={verbatimText}
                  onChange={handleTextChange}
                  isTextArea
                />
                <TextStats text={verbatimText} />
              </div>
            </div>
            
            <div className="mt-8 space-y-4">
              <ToggleSwitch
                label="Gerar Voz"
                checked={generateVoice}
                onChange={setGenerateVoice}
              />
              <button
                onClick={handleGenerate}
                disabled={isGenerating || !verbatimText.trim()}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-orange-500 disabled:bg-gray-500 disabled:cursor-not-allowed transition duration-150 ease-in-out"
              >
                {isGenerating ? (
                  <>
                    <SpinnerIcon className="w-5 h-5 mr-2" />
                    Gerando...
                  </>
                ) : (
                  generateVoice ? 'Gerar Voz e JSON' : 'Gerar JSON'
                )}
              </button>
            </div>

            {error && (
                <div className="mt-6 p-4 bg-red-900/50 text-red-300 border border-red-700 rounded-md">
                    <p className="font-semibold">Error</p>
                    <p>{error}</p>
                </div>
            )}

            {generatedDialogue && (
                <JsonOutput dialogue={generatedDialogue} />
            )}

            {audioData && !isGenerating && (
                <AudioPlayer audioData={audioData} />
            )}

          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
