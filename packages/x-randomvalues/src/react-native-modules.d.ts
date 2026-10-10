// Copyright 2017-2026 @pezkuwi/x-randomvalues authors & contributors
// SPDX-License-Identifier: Apache-2.0

// The one React Native export react-native.ts reads, and only the native
// modules it looks for. Declared here instead of installing react-native for
// its types, which brought in its metro and CLI tree as well.
declare module 'react-native' {
  interface RandomModules {
    ExpoRandom?: {
      getRandomBase64String: (length: number) => string;
    };
    RNGetRandomValues?: {
      getRandomBase64: (length: number) => string;
    };
  }

  export const NativeModules: RandomModules;
}
