import { describe, expect, it } from 'vitest';

import { type ErrorCorrection, encodeQrMatrix } from './qr';

const LEVELS: ErrorCorrection[] = ['L', 'M', 'Q', 'H'];

const size = (text: string, ecc?: ErrorCorrection): number => encodeQrMatrix(text, ecc).length;

/** Render a matrix as '#' or '.' cells in rows */
const render = (matrix: boolean[][]): string =>
  matrix.map((row) => row.map((cell) => (cell ? '#' : '.')).join('')).join('\n');

const isValidSize = (n: number): boolean => n >= 21 && n <= 177 && (n - 17) % 4 === 0;

/**
 * Assert the 7x7 finder pattern centred at (cx, cy): a dark 3x3 core, a light
 * ring, and a dark outer ring.
 */
const expectFinder = (modules: boolean[][], cx: number, cy: number): void => {
  for (let dy = -3; dy <= 3; dy++) {
    for (let dx = -3; dx <= 3; dx++) {
      const expected = Math.max(Math.abs(dx), Math.abs(dy)) !== 2;
      expect(modules[cy + dy][cx + dx], `finder(${cx},${cy}) offset(${dx},${dy})`).toBe(expected);
    }
  }
};

/** Assert QR has finders at the three non-bottom-right corners. */
const expectAllFinders = (modules: boolean[][]): void => {
  const n = modules.length;
  expectFinder(modules, 3, 3); // top-left
  expectFinder(modules, n - 4, 3); // top-right
  expectFinder(modules, 3, n - 4); // bottom-left
};

describe('encodeQrMatrix: output shape', () => {
  it('returns a non-empty square matrix of booleans', () => {
    const m = encodeQrMatrix('hello');
    expect(m.length).toBeGreaterThan(0);
    for (const row of m) {
      expect(row).toHaveLength(m.length); // square
      for (const cell of row) expect(typeof cell).toBe('boolean');
    }
  });

  it('uses version 1 (21x21) for short input', () => {
    expect(size('hi')).toBe(21);
  });

  it('always produces a valid QR side length (version * 4 + 17)', () => {
    for (const text of ['', 'a', 'a'.repeat(50), 'a'.repeat(500)]) {
      expect(isValidSize(size(text))).toBe(true);
    }
  });
});

describe('version / capacity selection', () => {
  it('encodes the empty string as a version-1 code', () => {
    expect(size('')).toBe(21);
  });

  it('picks the version from byte capacity per error-correction level', () => {
    // Version-1 byte capacities: L=17, M=14, Q=11, H=7. Ten bytes fits L/M/Q at
    // v1 (21x21) but overflows H, bumping it to v2 (25x25).
    expect(size('a'.repeat(10), 'L')).toBe(21);
    expect(size('a'.repeat(10), 'M')).toBe(21);
    expect(size('a'.repeat(10), 'Q')).toBe(21);
    expect(size('a'.repeat(10), 'H')).toBe(25);
  });

  it('bumps to the next version exactly at the capacity boundary', () => {
    // L holds 17 data bytes at v1; the 18th byte forces v2.
    expect(size('a'.repeat(17), 'L')).toBe(21);
    expect(size('a'.repeat(18), 'L')).toBe(25);
  });

  it('never shrinks as the input grows (fixed ecc)', () => {
    const lengths = [0, 5, 20, 40, 100, 300];
    const sizes = lengths.map((n) => size('a'.repeat(n), 'M'));
    for (let i = 1; i < sizes.length; i++) {
      expect(sizes[i]).toBeGreaterThanOrEqual(sizes[i - 1]);
    }
  });

  it('requires an equal-or-larger version for stronger error correction', () => {
    for (const n of [10, 30, 80]) {
      const text = 'a'.repeat(n);
      expect(size(text, 'H')).toBeGreaterThanOrEqual(size(text, 'L'));
    }
  });

  it('handles large payloads that reach the 16-bit count + version-info path', () => {
    // ~1000 bytes forces a high version (>= 7), exercising drawVersion, many
    // alignment patterns, and the 16-bit character-count indicator.
    const m = encodeQrMatrix('a'.repeat(1000), 'L');
    expect(isValidSize(m.length)).toBe(true);
    expect(m.length).toBeGreaterThanOrEqual(45); // version >= 7
    expectAllFinders(m);
  });

  it('throws when the data cannot fit in a version-40 code', () => {
    expect(() => encodeQrMatrix('a'.repeat(3000), 'L')).toThrow('QR data too long');
  });
});

describe('UTF-8 byte counting', () => {
  it('counts bytes, not characters', () => {
    // 'é' is two UTF-8 bytes: nine of them (18 bytes) overflow v1 (L=17) while
    // nine ASCII bytes still fit.
    expect(size('a'.repeat(9), 'L')).toBe(21);
    expect(size('é'.repeat(9), 'L')).toBe(25);
  });

  it('encodes multi-byte characters without error', () => {
    const m = encodeQrMatrix('日本語 😀', 'M');
    expect(isValidSize(m.length)).toBe(true);
    expectAllFinders(m);
  });
});

describe('error-correction levels', () => {
  it('accepts all four levels and produces valid matrices', () => {
    for (const ecc of LEVELS) {
      expect(isValidSize(size('data', ecc))).toBe(true);
    }
  });

  it("defaults to level 'M'", () => {
    expect(encodeQrMatrix('portfolio')).toEqual(encodeQrMatrix('portfolio', 'M'));
  });
});

describe('function patterns', () => {
  it('draws the three finder patterns', () => {
    expectAllFinders(encodeQrMatrix('hi')); // v1
    expectAllFinders(encodeQrMatrix('a'.repeat(60))); // multi-version, has alignment patterns
  });

  it('draws the alternating timing pattern between the finders (v1)', () => {
    const m = encodeQrMatrix('hi'); // 21x21, no alignment patterns to interrupt timing
    for (let i = 8; i <= 12; i++) {
      expect(m[6][i], `timing row x=${i}`).toBe(i % 2 === 0);
      expect(m[i][6], `timing col y=${i}`).toBe(i % 2 === 0);
    }
  });

  it('sets the always-dark module', () => {
    const m = encodeQrMatrix('hi');
    expect(m[m.length - 8][8]).toBe(true);
  });
});

describe('determinism & regression', () => {
  it('is deterministic for identical input (stable mask selection)', () => {
    expect(encodeQrMatrix('repeatable', 'Q')).toEqual(encodeQrMatrix('repeatable', 'Q'));
  });

  it('matches the known-good snapshot', () => {
    // Regenerates intentionally if the encoder changes.
    expect(render(encodeQrMatrix('https://example.com', 'M'))).toMatchSnapshot();
  });
});
