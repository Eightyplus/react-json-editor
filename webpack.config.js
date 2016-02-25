const path = require('path');

const PATHS = {
    src: path.join(__dirname, 'src'),
    build: path.join(__dirname, 'build')
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
        filename: 'bundle.js'
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
                plugins: ["transform-react-jsx"],
                query: {
                    presets: ['react', 'es2015', "stage-0"]
                }
            }
        ]
    }
};
