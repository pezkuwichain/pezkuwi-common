import { extractGlobal } from '@pezkuwi/x-global';
import { TextDecoder as Fallback } from './fallback.js';
export { packageInfo } from './packageInfo.js';
export const TextDecoder = /*#__PURE__*/ extractGlobal('TextDecoder', Fallback);
