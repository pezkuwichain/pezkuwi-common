import * as sr25519 from '@pezkuwi/scure-sr25519';
import { createDeriveFn } from './derive.js';
export const sr25519DeriveHard = /*#__PURE__*/ createDeriveFn(sr25519.HDKD.secretHard);
