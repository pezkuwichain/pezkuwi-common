"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const x_fetch_1 = require("@pezkuwi/x-fetch");
const x_global_1 = require("@pezkuwi/x-global");
(0, x_global_1.exposeGlobal)('fetch', x_fetch_1.fetch);
