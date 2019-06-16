module.exports = {
    app: {
        path: 'demo'
    },
    entry: 'index.tsx',
    env: {
        development: {
            plugins: []
        },
        production: {
            plugins: []
        }
    },
    output: {
        path: 'docs'
    },
    lib: {
        path: 'lib'
    },
    src: {
        path: 'src'
    },
    types: {
        path: 'lib'
    },
    ignore: ['package.json', 'CHANGELOG.md', 'docs']
}
