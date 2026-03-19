import { ChartData } from '../types';

export const c = (time: number, o: number, h: number, l: number, cl: number, v: number = 100): ChartData => ({
  time, open: o, high: h, low: l, close: cl, volume: v
});
