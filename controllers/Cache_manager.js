import { Keyv } from 'keyv';
import KeyvRedis from '@keyv/redis';
import { createCache } from 'cache-manager';

const cache = createCache({
  stores: [
    new Keyv({
      store: new KeyvRedis('redis://localhost:6379'),
    }),
  ],
})


export default cache
