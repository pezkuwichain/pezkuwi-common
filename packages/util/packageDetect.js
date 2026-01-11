import { packageInfo as decoderInfo } from '@pezkuwi/x-textdecoder';
import { packageInfo as encoderInfo } from '@pezkuwi/x-textencoder';
import { detectPackage } from './detectPackage.js';
import { packageInfo } from './packageInfo.js';
detectPackage(packageInfo, null, [decoderInfo, encoderInfo]);
