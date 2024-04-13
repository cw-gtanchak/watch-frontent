import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, ApolloLink } from '@apollo/client';
import { RetryLink } from '@apollo/client/link/retry';
import { createRoot } from 'react-dom/client';
// import { StrictMode } from 'react';

import './index.css';

import App from './App';

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_GRAPHQL_ENDPOINT,
});

export const client = new ApolloClient({
  link: ApolloLink.from([new RetryLink(), httpLink]),
  cache: new InMemoryCache(),
});

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);
  root.render(
    // <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
    // </StrictMode>
  );
}

