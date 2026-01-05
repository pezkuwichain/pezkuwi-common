# @pezkuwi/x-global

A cross-environment global object. checks for global > self > window > this.

Install it via `yarn add @pezkuwi/x-global`

```js
import { xglobal } from '@pezkuwi/x-global';

console.log(typeof xglobal.TextEncoder);
```
