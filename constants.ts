import { ToneTemplate, VoicePreset } from './types';

export const note = "(Nota: Garantir que a fala seja 100% em Português do Brasil).";

export const toneTemplates: ToneTemplate[] = [
    {
        name: 'Friendly & Gentle',
        value: `Meigo, suave e calmo. Voz amigável e acolhedora, com uma persuasão gentil, sem ser urgente. ${note}`
    },
    {
        name: 'Urgent & Persuasive',
        value: `Tom de urgência e persuasão. Voz enérgica e convincente, incentivando uma ação imediata. ${note}`
    },
    {
        name: 'Formal & Informative',
        value: `Tom formal e informativo. Voz clara, calma e profissional, ideal para anúncios importantes. ${note}`
    },
    {
        name: 'Excited & Enthusiastic',
        value: `Tom animado e entusiasmado. Voz vibrante e cheia de energia, perfeita para promoções e novidades. ${note}`
    }
];

export const voicePresets: VoicePreset[] = [
    { name: 'Zephyr (Female, Gentle)', value: 'Zephyr' },
    { name: 'Kore (Female, Calm)', value: 'Kore' },
    { name: 'Puck (Male, Bright)', value: 'Puck' },
    { name: 'Charon (Male, Deep)', value: 'Charon' },
    { name: 'Fenrir (Male, Strong)', value: 'Fenrir' },
];

export const initialText = "Dá uma olhadinha no preço. Clica aqui no carrinho laranja e olha só o preço. Tá muito barato. Aproveita essa mochila antes que esgote.";
