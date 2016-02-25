const path = require('path');
const webpack = require('webpack');

const PATHS = {
    src: path.join(__dirname, 'src'),
    build: path.join(__dirname)
};

module.exports = {
    entry: {
        filename: './entry.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    output: {
        path: PATHS.build,
        filename: 'index.js'
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loaders: ['style', 'css'],
                include: PATHS.src
            },
            {
                test: /\.jsx?$/,
                include: PATHS.src,
                loader: 'babel',
                plugins: ['transform-react'],
                'env': {
                    'development': {
                        'plugins': [['react-transform', {
                            'transforms': [{
                                'transform': 'react-transform-hmr',
                                'imports': ['react'],
                                'locals': ['module']
                            }]
                        }]]
                    }
                }
            }
        ]
    }
};
