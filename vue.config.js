// eslint-disable-next-line @typescript-eslint/no-var-requires
const JavaScriptObfuscator = require('webpack-obfuscator');

module.exports = {
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
            config.plugins.splice(1, 0, new JavaScriptObfuscator({
                compact: true,
                rotateStringArray: false,
                identifierNamesGenerator: 'hexadecimal',
                sourceMap: false,
                stringArray: true,
                debugProtection: true, /*禁用开发者工具*/
                selfDefending: true,
                stringArrayEncoding: true,
                stringArrayThreshold: 1,
                log: false,
                target: "browser"
            }));
            /*config.plugins.push();*/
        } else {
            // 为开发环境修改配置
            config.mode = 'development';
        }
    },
};