import { createClient, dedupExchange, fetchExchange } from 'urql';
import { cacheExchange } from '@urql/exchange-graphcache';

const cacheConfig = {
  keys: {
    Image: (image) => image.href,
    Artwork: (artwork) => artwork.slug,
  },
  resolvers: {
    Query: {
      artwork: (_, args) => ({ __typename: 'Artwork', slug: args.id }),
    },
  },
  updates: {
    /* ... */
  },
  optimistic: {
    /* ... */
  },
};

export const clientd = createClient({
  url: 'http://localhost:4000/graphql',
  exchanges: [
    fetchExchange,
  ],
});