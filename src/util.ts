import { URL } from 'url';
import crypto from 'crypto';
// const { URL } = require('url');

export function getName(rawInput: string): string {
  const hasProtocol = rawInput.includes('://');
  if (!hasProtocol) {
    rawInput = 'http://' + rawInput;
  }

  const inputArg = new URL(rawInput);
  const domain = inputArg.hostname.replace(/^www\./, '');
  const segments = domain.split('.');
  return segments.length === 1 ? segments[0] : segments.slice(0, -1).join('.');
}

export function generateRandomHex(rawLength: number): string {
  const length = Math.max(rawLength, 0);
  return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
}
