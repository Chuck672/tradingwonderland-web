export interface ChartAnnotation {
  type: 'fvg' | 'ob' | 'sweep' | 'bos' | 'choch' | 'text' | 'trend';
  y1?: number;
  y2?: number;
  x1?: number;
  x2?: number;
  text?: string;
  color?: string;
}

export interface ChartData {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface LocalizedString {
  zh: string;
  en: string;
}

export interface LocalizedArray {
  zh: string[];
  en: string[];
}

export interface Slide {
  id: string;
  title: LocalizedString;
  bullets: LocalizedArray;
  chartData?: ChartData[];
  annotations?: ChartAnnotation[];
  diagram?: string;
  script: LocalizedString;
}

export interface Module {
  id: string;
  title: LocalizedString;
  slides: Slide[];
}
