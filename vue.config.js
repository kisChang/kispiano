// eslint-disable-next-line @typescript-eslint/no-var-requires
const TerserPlugin = require('terser-webpack-plugin')

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
    configureWebpack: (config) => {
        if (process.env.NODE_ENV === 'production') {
            // 为生产环境修改配置
            config.mode = 'production';

            // 代码混淆
            // 将每个依赖包打包成单独的js文件
            const optimization = {
                minimize: true,
                minimizer: [new TerserPlugin({
                    terserOptions: {
                        warnings: false,
                        compress: {
                            // eslint-disable-next-line @typescript-eslint/camelcase
                            drop_console: true, drop_debugger: true, pure_funcs: ['console.log']
                        },
                    }
                })],
            };
            Object.assign(config, {
                optimization
            })
        } else {
            // 为开发环境修改配置
            config.mode = 'development';
        }
    },
};