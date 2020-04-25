module.exports = {
    pluginOptions: {
        i18n: {
            locale: 'en',
            fallbackLocale: 'en',
            localeDir: 'locales',
            enableInSFC: true
        }
    },
    "transpileDependencies": [
        "vuetify"
    ],
    pwa: {
        name: "International Camp Dictionary",
        short_name: "camp dict",
        themeColor: "#4caf50",
    },
    configureWebpack: {
        module: {
            rules: [ {
                test: /\.obf$/,
                loader: 'raw-loader', // npm install -D raw-loader
            }]
        }
    }
};
