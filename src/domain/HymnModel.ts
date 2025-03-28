export interface KeySignature {
  accidental: number;
}

export interface TimeSignature {
  sigN: number;
  sigD: number;
}

export interface Tempo {
  reference: number;
  text: string;
}

export interface Verse {
  chords: string;
  lyrics: string;
}

export interface Stanza {
  type: string;
  code?: string;
  verses?: Verse[];
  ref?: string;
}

export interface Score {
  stanzas: Stanza[];
}

export interface HymnModel {
  version: string;
  code: string;
  title: string;
  difficulty: number;
  tone: string;
  content?: string[];
  score: Score;
  keySig: KeySignature;
  measures: TimeSignature;
  time: Tempo;
}
