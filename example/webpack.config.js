const lessToJs = require('less-vars-to-js')
const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const HappyPack = require('happypack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const pxtorem = require('postcss-pxtorem')
const autoprefixer = require('autoprefixer')
const CompressionPlugin = require('compression-webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const babelLoader = [
  {
    loader: 'babel-loader',
    options: {
      babelrc: false,
      presets: [
        ['@babel/env', {
          targets: {
            browsers: ['last 2 versions', 'safari >= 8'],
          },
        }],
        '@babel/flow',
        '@babel/react',
      ],
      plugins: [
        'lodash',
        'react-native-web',
        'dynamic-import-node-babel-7',
        ['@babel/proposal-decorators', { legacy: true }],
        ['@babel/proposal-class-properties', { loose: true }],
        ['import', { libraryName: 'antd-mobile', style: true }],
        ['@babel/transform-runtime', { helpers: false, corejs: 2, regenerator: true }],
      ],
    },
  },
  {
    loader: '@terminus/loadable-loader',
    options: {
      loadablePath: 'app/utils/loadable',
      replaceRequire: 'Loadable(()=>import(\'$1\'))',
    },
  },
]

const modifyVarsLess = fs.readFileSync('themes/default.less', 'utf8')
const platette = lessToJs(modifyVarsLess)

const postcssOpts = {
  ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
  plugins: () => [
    autoprefixer({
      browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4'],
    }),
    pxtorem({
      rootValue: 20,
      propWhiteList: [],
    }),
  ],
  sourceMap: true,
}

module.exports = (env, argv) => {
  const IS_PROD = argv.mode === 'production'
  const CDN_PATH = '/'
  const PUBLIC_PATH = IS_PROD ? CDN_PATH : '/'
  const webpackConfig = {
    stats: { children: false },
    mode: 'production',
    entry: {
      vendor: ['react', 'core-js', 'dva-no-router', 'superagent', 'superagent-use', 'dva-loading', 'fastclick', 'react-native-web', 'react-dom', 'rc-form', 'react-navigation', 'react-singleton', 'react-imageview'],
      app: ['./app/styles/style.less', './index.web.js'],
    },
    output: {
      path: path.resolve(__dirname, 'public'),
      filename: IS_PROD ? 'assets/scripts/[name].[chunkhash].js' : 'assets/scripts/[name].js',
      chunkFilename: IS_PROD ? 'assets/scripts/[chunkhash].chunk.js' : 'assets/scripts/[id].chunk.js',
      publicPath: PUBLIC_PATH,
    },
    devServer: {
      contentBase: path.resolve(__dirname, 'public'),
      index: '/views/index.html',
      port: 8082,
      historyApiFallback: {
        rewrites: [
          { from: /^.*$/, to: '/views/index.html' },
        ],
      },
    },
    node: {
      global: true,
    },
    module: {
      rules: [{
        test: /\.(less)$/,
        include: [
          path.resolve(__dirname, 'node_modules/antd-mobile'),
          path.resolve(__dirname, 'node_modules/@terminus/rn-components'),
          path.resolve(__dirname, './themes'),
          path.resolve(__dirname, './app'),
        ],
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: postcssOpts,
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: true,
              modifyVars: platette, // 通过less-vars-to-js插件将less文件转换为js导入
              javascriptEnabled: true,
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: postcssOpts,
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: true,
              localIdentName: '[name]_[local]-[hash:base64:5]',
            },
          },
          {
            loader: 'postcss-loader',
            options: postcssOpts,
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: [path.resolve(__dirname, 'node_modules/compass-mixins/lib')],
            },
          },
        ],
        include: [
          path.resolve(__dirname, 'node_modules/@terminus/eevee'),
          path.resolve(__dirname, 'app'),
        ],
      },
      {
        test: /\.(svg)$/,
        use: ['svg-sprite-loader'],
        include: [
          require.resolve('antd-mobile').replace(/warn\.js$/, ''),
        ],
      },
      {
        test: /\.tsx|\.jsx|\.ts|\.js?$/,
        include: [
          path.resolve(__dirname, 'index.web.js'),
          path.resolve(__dirname, 'envs'),
          path.resolve(__dirname, 'app'),
          path.resolve(__dirname, './themes'),
          path.resolve(__dirname, 'node_modules/@terminus'),
          path.resolve(__dirname, 'node_modules/@react-navigation'),
          path.resolve(__dirname, 'node_modules/react-native-gesture-handler'),
          path.resolve(__dirname, 'node_modules/react-native-tab-view'),
          path.resolve(__dirname, 'node_modules/react-native-storage'),
          path.resolve(__dirname, 'node_modules/react-native-safe-area-view'),
          path.resolve(__dirname, 'node_modules/react-navigation-deprecated-tab-navigator'),
          path.resolve(__dirname, 'node_modules/react-navigation-tabs'),
          path.resolve(__dirname, 'node_modules/react-navigation-drawer'),
          path.resolve(__dirname, 'node_modules/react-navigation-stack'),
          path.resolve(__dirname, 'node_modules/react-navigation-redux-helpers'),
        ],
        loader: 'happypack/loader?id=babel',
      },
      {
        test: /\.(gif|jpe?g|png)$/,
        loader: 'url-loader',
        options: {
          limit: 512,
          name: 'assets/files/[name].[hash:16].[ext]',
        },
      },
      ],
    },
    resolve: {
      alias: {
        color: path.join(__dirname, 'themes/default.less'),
        'react-native': 'react-native-web',
        'react-navigation': path.join(__dirname, 'node_modules/@terminus/react-navigation/src/react-navigation.js'),
        'rn-components': path.join(__dirname, 'node_modules/@terminus/rn-components'),
        'react-native-web-utils': path.join(__dirname, 'node_modules/@terminus/trnw-tools/react-native-web-utils'),
        'react-native-navigators-tools': path.join(__dirname, 'node_modules/@terminus/trnw-tools/react-native-navigators-tools'),
        'react-imageview': path.join(__dirname, 'node_modules/@terminus/react-imageview'),
        'react-native-gesture-handler': path.join(__dirname, 'node_modules/react-native-gesture-handler'),
        'react-native-tab-view': path.join(__dirname, 'node_modules/@terminus/react-native-tab-view'),
      },
      modules: [
        path.resolve(__dirname, './'),
        'node_modules',
      ],
      extensions: ['.web.ts', '.ts', '.web.tsx', '.tsx', '.web.js', '.js', '.less', '.web.jsx', '.jsx', '.json'],
    },
    plugins: [
      new HappyPack({
        id: 'babel',
        loaders: babelLoader,
        threads: 4,
      }),
      new webpack.DefinePlugin({
        __DEV__: false,
      }),
      new webpack.ProvidePlugin({
        ENV: `envs/${argv.mode || 'development'}`,
      }),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new HtmlWebpackPlugin({
        filename: 'views/index.hbs',
        template: './app/views/index.ejs',
      }),
      new MiniCssExtractPlugin({
        filename: `assets/styles/[name]${IS_PROD ? '[contenthash]' : ''}.css`,
        allChunks: true,
      }),
      // new webpack.optimize.CommonsChunkPlugin({ name: 'vendor' }),
      // new BundleAnalyzerPlugin(),
    ],
    optimization: {
      splitChunks: {
        minChunks: 1,
        cacheGroups: {
          vendors: {
            chunks: 'initial',
            name: 'vendor',
            test: 'vendor',
            enforce: true,
          },
        },
      },
    },
  }

  if (argv.mode === 'production') {
    // // gizp 压缩
    webpackConfig.plugins.push(new CompressionPlugin({
      test: /\.js|\.css/,
      algorithm: 'gzip',
      threshold: 10240, // 10K以内不进行压缩
      minRatio: 0.8,
    }))
  }

  if (argv.mode === 'development') {
    // map文件生成
    webpackConfig.devtool = 'source-map'
    webpackConfig.plugins.push(new HtmlWebpackPlugin({
      filename: 'views/index.html',
      template: './app/views/index.ejs',
    }))
  }

  return webpackConfig
}
