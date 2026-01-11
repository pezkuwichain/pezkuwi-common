import { packageInfo as netInfo } from '@pezkuwi/networks/packageInfo';
import { detectPackage } from '@pezkuwi/util';
import { packageInfo as utilInfo } from '@pezkuwi/util/packageInfo';
import { packageInfo as randomInfo } from '@pezkuwi/x-randomvalues';
import { packageInfo } from './packageInfo.js';
detectPackage(packageInfo, null, [netInfo, randomInfo, utilInfo]);
