/**
 * vh, vw
*/
import L from '../constants/Layout'
const {window} = L;

const percentMetric = (metric: number, value: number = 0) => {
  value = Math.min(value, 100);
  value = Math.max(value, 0);
  return Math.round((metric * value) / 100);
};

export const vh = (value: number): number => percentMetric(window.height, value);

export const vw = (value: number): number => percentMetric(window.width, value);
