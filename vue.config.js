// eslint-disable-next-line @typescript-eslint/no-var-requires
const TerserPlugin = require('terser-webpack-plugin')

const cdn = {
    css: [],
    js: [
        'https://cdn.bootcdn.net/ajax/libs/core-js/3.6.5/minified.min.js',
        'https://cdn.bootcdn.net/ajax/libs/vue/2.6.12/vue.min.js',
        'https://cdn.bootcdn.net/ajax/libs/vue-router/3.2.0/vue-router.min.js',
        'https://cdn.bootcdn.net/ajax/libs/bootstrap-vue/2.10.0/bootstrap-vue.min.js'
    ]
};

module.exports = {
    productionSourceMap: false,
    pwa: {
        name: 'Kis Piano',
        themeColor: '#fafafa',
        msTileColor: '#fafafa',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'black',
        manifestOptions: {
            display: 'standalone',
        },
        workboxOptions: {
            skipWaiting: true,
        },
    },
    devServer: {
        port: 10070,
        disableHostCheck: true,
    },
    chainWebpack: config => {
        // 注入cdn
        config.plugin('html').tap(args => {
            args[0].cdn = cdn;
            return args;
        });

        if (process.env.NODE_ENV === 'production') {
            // 为生产环境修改配置
            config.mode = 'production';
        } else {
            // 为开发环境修改配置
            config.mode = 'development';
        }
    },

    configureWebpack: config => {
        // 用cdn方式引入
        config.externals = ['vue', 'vue-router', 'core-js', 'bootstrap-vue'];

        //代码压缩
        if (process.env.NODE_ENV === 'production') {
            // 代码混淆
            // 将每个依赖包打包成单独的js文件
            const optimization = {
                minimize: true,
                minimizer: [new TerserPlugin({
                    parallel: true,
                    sourceMap: false,
                    extractComments: false,
                    terserOptions: {
                        compress: {
                            // eslint-disable-next-line @typescript-eslint/camelcase
                            drop_console: true, drop_debugger: true, pure_funcs: ['console.log']
                        }
                    }
                })],
            };
            Object.assign(config, {
                optimization
            });
        }
    }
};