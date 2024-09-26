import { describe, it, expect } from 'vitest';
import { generateRandomHex, getName } from './util';

describe('generateRandomHex', () => {
  it('should generate a random hex string of the specified length', () => {
    const length = 10;
    const randomHex = generateRandomHex(length);
    expect(randomHex).toHaveLength(length);
    expect(randomHex).toMatch(/^[0-9a-fA-F]+$/);
  });

  it('should generate a long hex string', () => {
    const length = 10000;
    const randomHex = generateRandomHex(length);
    expect(randomHex).toHaveLength(length);
    expect(randomHex).toMatch(/^[0-9a-fA-F]+$/);
  });

  it('should generate empty text string', () => {
    const length = 0;
    const randomHex = generateRandomHex(length);
    expect(randomHex).toHaveLength(length);
  });

  it('should not throw an error for negative length', () => {
    const randomHex = generateRandomHex(-10);
    expect(randomHex).toHaveLength(0);
  });
});

describe('getName', () => {
  const testCases = [
    [
      'https://www.example.com/3508253/checkouts/ee6751f27ea600d0c133445710f11db0?_ga=2.208438866.1566561875.1678469276-1096666253.1678469276',
      'example'
    ],
    [
      'http://abc.hostname.com/somethings/anything/',
      'abc.hostname'
    ],
    [
      'ftp://www.hostname.com/somethings/anything/',
      'hostname'
    ],
    [
      'mailto:princess@wiggles.com?subject=princess.sleeps',
      'wiggles'
    ],
    [
      'calendar.google.com',
      'calendar.google'
    ],
    [
      'https://calendar.google.com/calendar/u/0/r/week',
      'calendar.google'
    ],
    [
      'https://www.geeksforgeeks.org/python-os-environ-object/',
      'geeksforgeeks'
    ],
    [
      'google.biz',
      'google'
    ],
  ];

  testCases.forEach(([rawInput, expected]) => {
    it(`should return "${expected}" for input "${rawInput}"`, () => {
        const actual = getName(rawInput);
        expect(actual).toBe(expected);
    });
  });
});
