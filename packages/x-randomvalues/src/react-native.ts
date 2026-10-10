// Copyright 2017-2026 @pezkuwi/x-randomvalues authors & contributors
// SPDX-License-Identifier: Apache-2.0

// Adapted from https://github.com/LinusU/react-native-get-random-values/blob/85f48393821c23b83b89a8177f56d3a81dc8b733/index.js
//
// Copyright (c) 2018, 2020 Linus Unnebäck
// SPDX-License-Identifier: MIT

import { NativeModules } from 'react-native';

import { base64Decode } from '@pezkuwi/wasm-util/base64';
import { xglobal } from '@pezkuwi/x-global';

import { crypto as cryptoBrowser, getRandomValues as getRandomValuesBrowser } from './browser.js';

export { packageInfo } from './packageInfo.js';

/**
 * @internal
 *
 * A getRandomValues util that detects and uses the available RN
 * random utiliy generation functions.
 **/
function getRandomValuesRn (output: Uint8Array): Uint8Array {
  const { ExpoRandom, RNGetRandomValues } = NativeModules;

  if (RNGetRandomValues) {
    return base64Decode(RNGetRandomValues.getRandomBase64(output.length), output);
  } else if (ExpoRandom) {
    return base64Decode(ExpoRandom.getRandomBase64String(output.length), output);
  }

  throw new Error('No secure random number generator available. This environment does not support crypto.getRandomValues and no React Native secure RNG module is available.');
}

// Check for native RN modules first (highest priority)
const hasNativeRNModules = !!NativeModules.ExpoRandom || !!NativeModules.RNGetRandomValues;
const hasNativeCrypto = typeof xglobal.crypto === 'object' && typeof xglobal.crypto.getRandomValues === 'function';

export const getRandomValues = (
  hasNativeRNModules
    ? getRandomValuesRn
    : hasNativeCrypto
      ? getRandomValuesBrowser
      : () => {
        throw new Error('No secure random number generator available. This environment does not support crypto.getRandomValues.');
      }
);

export const crypto = (
  getRandomValues === getRandomValuesBrowser
    ? cryptoBrowser
    : { getRandomValues }
);
