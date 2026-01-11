import { packageInfo as transportInfo } from '@pezkuwi/hw-ledger-transports/packageInfo';
import { detectPackage } from '@pezkuwi/util';
import { packageInfo as utilInfo } from '@pezkuwi/util/packageInfo';
import { packageInfo } from './packageInfo.js';
detectPackage(packageInfo, null, [transportInfo, utilInfo]);
