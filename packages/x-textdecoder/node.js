import util from 'node:util';
import { extractGlobal } from '@pezkuwi/x-global';
export { packageInfo } from './packageInfo.js';
export const TextDecoder = /*#__PURE__*/ extractGlobal('TextDecoder', util.TextDecoder);
