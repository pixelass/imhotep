module.exports = {
    env: {
        development: {
            plugins: [
                [
                    'styled-components',
                    {
                        ssr: true,
                        displayName: true
                    }
                ]
            ]
        }
    },
    extends: 'imhotep/config/.babelrc'
}
