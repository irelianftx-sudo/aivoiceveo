export interface Dialogue {
  language: string;
  accent: string;
  tone: string;
  verbatim_text: string;
}

export interface ToneTemplate {
  name: string;
  value: string;
}

export interface VoicePreset {
  name: string;
  value: string;
}
