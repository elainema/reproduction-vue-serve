const path = require("path");
const outputDir = "output/dianyi/app/yfp/newmanage"
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const TerserPlugin = require('terser-webpack-plugin')
module.exports = {
	  lintOnSave:false,
    outputDir:outputDir,
    productionSourceMap:false,
    publicPath: '/',
    chainWebpack: config => {
      // 移除 prefetch 插件
      config.plugins.delete('prefetch')
      
      config.module
        .rule('images')
          .use('url-loader')
            .loader('url-loader')
            .tap(options => Object.assign(options, { limit: 10240 }))
    },
    configureWebpack: (config) => ({
        resolve: {
          alias: {
            vue$: 'vue/dist/vue.js',
            '@': path.join(__dirname, 'src'),
            '@css': path.join(__dirname, 'src', 'assets','css'),
            '@node_modules':path.join(__dirname, 'node_modules'),
            'table2excel':path.join(__dirname, 'src', 'assets','js','jquery.table2excel.min.js'),
          },
        },
        // 移除console
        optimization: {
          minimizer: [new TerserPlugin({ terserOptions: { compress: { drop_console: true } } })]
        },
        plugins: [
          // 使用ele其它语言，默认情况下中文语言包依旧是被引入的，使用 webpack 的 NormalModuleReplacementPlugin 替换默认语言包。
          new webpack.NormalModuleReplacementPlugin(/element-ui[\/\\]lib[\/\\]locale[\/\\]lang[\/\\]zh-CN/, 'element-ui/lib/locale/lang/en'),
        ],
    }),
    css: {
      loaderOptions: {
        less: {
          javascriptEnabled: true
        },
        postcss: {
          ident: 'postcss',
          plugins: [
            autoprefixer({
              browsers: ['ie >= 8','Firefox >= 20', 'Safari >= 5', 'Android >= 4','Ios >= 6', 'last 4 version'],
              remove: true
            }),
          ],
          sourceMap:false
        }
      }
    },
    pwa: {
      name: 'yeahmobi-manage-sys',
      themeColor: '#3d5165',
      msTileColor: '#000000',
      appleMobileWebAppCapable: 'yes',
      appleMobileWebAppStatusBarStyle: 'black',

      // configure the workbox plugin
      workboxPluginMode: 'InjectManifest',
      workboxOptions: {
        // swSrc is required in InjectManifest mode.
        swSrc: './sw.js',
      }
    },
    devServer: {
      host: '0.0.0.0',
      port: 80,
      disableHostCheck: true
    }
}
