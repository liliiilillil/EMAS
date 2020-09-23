/* eslint-disable */
const HappyPack = require('happypack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const cssLoaders = require('./loader/css');
const lessLoaders = require('./loader/less');
const postcssLoaders = require('./loader/postcss');
const sassLoaders = require('./loader/sass');
const tsLoaders = require('./loader/ts');
const babelLoaders = require('./loader/babel');
const pathConfig = require('./default-config');

const happyThreadPool = HappyPack.ThreadPool({ size: 2 });

const miniCssExtractPluginLoader = {
  loader: MiniCssExtractPlugin.loader,
  options: { publicPath: '/assets/' },
};

module.exports = {
  context: pathConfig.basePath,
  output: {
    path: pathConfig.outputPath,
    publicPath: pathConfig.publicPath,
    filename: 'assets/js/[name]-[hash].js',
    chunkFilename: 'assets/js/chunk-[name]-[hash].js',
  },
  resolve: { alias: pathConfig.resolveAlias, modules: pathConfig.resolveModules, extensions: pathConfig.extensions },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'happypack/loader?id=babel',
        include: pathConfig.babelIncludes,
      },
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      },
      {
        test: /\.less$/,
        use: [miniCssExtractPluginLoader, cssLoaders.loader, lessLoaders.loader],
      },
      {
        test: /(\.module\.scss$)|(@terminus\/eevee\-react\-native\-components\/.+\.scss$)/,
        use: [miniCssExtractPluginLoader, cssLoaders.cssModuleLoader, postcssLoaders.loader, sassLoaders.loader],
      },
      {
        test: /\.scss$/,
        exclude: /\.module\.scss$/,
        use: [miniCssExtractPluginLoader, cssLoaders.loader, postcssLoaders.loader, sassLoaders.loader],
      },
      {
        test: /\.css$/,
        use: [miniCssExtractPluginLoader, cssLoaders.loader, postcssLoaders.loader],
      },
      {
        test: /\.tsx?$/,
        include: pathConfig.babelIncludes,
        use: ['happypack/loader?id=babel', tsLoaders.loader],
      },
      {
        test: /\.(eot|woff|woff2|svg|ttf)([?]?.*)$/,
        use: { loader: 'file-loader' },
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 2048,
              outputPath: 'assets/images',
              publicPath: `${pathConfig.publicPath || ''}assets/images`,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    pathConfig.ProgressPlugin(),
    pathConfig.EnvironmentPlugin(),
    new MiniCssExtractPlugin({ filename: 'assets/styles/[name]-[hash].css' }),
    new CopyWebpackPlugin([{ from: 'src/assets', to: pathConfig.resolve('public/assets') }]),
    new HappyPack({
      id: 'babel',
      verbose: true,
      threadPool: happyThreadPool,
      loaders: [babelLoaders.loader],
    }),
  ],
};
