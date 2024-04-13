import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: process.env.VITE_GRAPHQL_ENDPOINT,
  documents: [__dirname + '/src/gql', __dirname + '/../timegraph-js/src/gql/fragment.graphql'],
  generates: {
    'src/gql/graphql.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
      config: {
        withHooks: true,
      },
    },
  },
};

export default config;
