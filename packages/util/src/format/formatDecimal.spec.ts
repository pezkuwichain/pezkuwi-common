// Copyright 2017-2026 @pezkuwi/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@pezkuwi/dev-test/globals.d.ts" />

import { formatDecimal } from './index.js';

describe('formatDecimal', (): void => {
  it('formats decimals in number groupings', (): void => {
    expect(formatDecimal('12345')).toEqual('12,345');
  });

  it('formats decimal-only in number groupings', (): void => {
    expect(formatDecimal('test6789')).toEqual('6,789');
  });

  it('returns input for non-decimal', (): void => {
    expect(formatDecimal('test')).toEqual('test');
  });

  it('returns non-sensical negative text', (): void => {
    expect(formatDecimal('-test')).toEqual('-test');
  });

  it('formats negative numbers', (): void => {
    expect(formatDecimal('-123456')).toEqual('-123,456');
  });

  // The pattern this replaced took quadratic time on a long digit run
  // (CodeQL js/polynomial-redos): 60k digits took seconds; this is linear.
  it('formats a very long number quickly', (): void => {
    const start = Date.now();
    const out = formatDecimal(`1${'0'.repeat(60_000)}`);

    expect(Date.now() - start < 1000).toEqual(true);
    expect(out.length).toEqual(60_001 + 20_000);
    expect(out.startsWith('1,000,000')).toEqual(true);
  });

  it('keeps the grouping of the pattern it replaced', (): void => {
    expect(formatDecimal('ab123cd')).toEqual('ab123cd');
    expect(formatDecimal('12a3456')).toEqual('3,456');
    expect(formatDecimal('1000000', '_')).toEqual('1_000_000');
  });
});
