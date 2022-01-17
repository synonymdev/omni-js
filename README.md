# Omni-JS

### Description

This library helps to facilitate the creation of on-chain omni transactions.

Omni spec docs can be found [here](https://github.com/OmniLayer/spec/blob/master/OmniSpecification.adoc).

### Installation
1. Clone omni-js:
   - `git clone git@github.com:synonymdev/omni-js.git && cd omni-js`

2. Install Dependencies:
   - `yarn install`

3. Build & Run tests:
   - `yarn build && yarn test`

4. Run example project:
   - `ts-node example`
   
### Implementation
```
import { createSimpleSend } from 'omni-js';

const data = createSimpleSend({
   currencyIdentifier: 31,
   numberOfCoins: 10
});

// Add to outputs/targets when forming the transaction.
const embed = bitcoin.payments.embed({
   data: [data],
   network,
});
targets.push({ script: embed.output!, value: 0 });
```
