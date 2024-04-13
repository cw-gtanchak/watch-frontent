require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: ['../config/eslint/base'],

  settings: {
    'import/resolver': {
      typescript: {
        project: ['packages/watch-frontend/tsconfig.json'],
      },
    },
  },
};
