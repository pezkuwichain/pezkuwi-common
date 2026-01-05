# @pezkuwi/x-fetch

A cross-environment fetch.

Install it via `yarn add @pezkuwi/x-fetch`

```js
import { fetch } from '@pezkuwi/x-fetch';

...
const response = await fetch('https://example.com/something.json');
const json = await response.json();
```
