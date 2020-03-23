module.exports = {
    env: {
        commonjs: true,
        es6: true,
    },
    extends: 'airbnb',
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module',
    },
    plugins: ['import', 'node', 'prettier', 'promise'],
    root: true,
    rules: {
        indent: ['error', 4],
    },
};
