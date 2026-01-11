import { detectPackage } from '@pezkuwi/util';
import { packageInfo as utilInfo } from '@pezkuwi/util/packageInfo';
import { packageInfo as cryptoInfo } from '@pezkuwi/util-crypto/packageInfo';
import { packageInfo } from './packageInfo.js';
detectPackage(packageInfo, null, [cryptoInfo, utilInfo]);
