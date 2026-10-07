// Copyright 2017-2026 @pezkuwi/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

function isDigit (c: string): boolean {
  return c >= '0' && c <= '9';
}

/**
 * Splits the digits of value into thousands groups, exactly as the pattern
 * /(\d+?)(?=(\d{3})+(?!\d)|$)/g matched them, without its quadratic cost
 * on long digit runs (CodeQL js/polynomial-redos): within each run of digits,
 * a group ends where the digits left in the run are a positive multiple of
 * three, or at the end of the string. A run that never reaches such a point
 * (two digits followed by a letter, say) contributes nothing.
 */
function groups (value: string): string[] {
  const out: string[] = [];
  const end = value.length;
  let i = 0;

  while (i < end) {
    if (!isDigit(value[i])) {
      i++;
      continue;
    }

    let j = i;

    while (j < end && isDigit(value[j])) {
      j++;
    }

    let start = i;

    while (start < j) {
      let stop = -1;

      for (let q = start + 1; q <= j; q++) {
        const left = j - q;

        if ((left > 0 && left % 3 === 0) || (left === 0 && j === end)) {
          stop = q;
          break;
        }
      }

      if (stop === -1) {
        break;
      }

      out.push(value.slice(start, stop));
      start = stop;
    }

    i = j;
  }

  return out;
}

/**
 * @name formatDecimal
 * @description Formats a number into string format with thousand separators
 */
export function formatDecimal (value: string, separator = ','): string {
  // We can do this by adjusting the regx, however for the sake of clarity
  // we rather strip and re-add the negative sign in the output
  const isNegative = value[0].startsWith('-');
  const matched = groups(isNegative ? value.substring(1) : value);

  return matched.length
    ? `${isNegative ? '-' : ''}${matched.join(separator)}`
    : value;
}
