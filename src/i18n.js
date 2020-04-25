import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n);

window.missingCodes = [];

function loadLocaleMessages() {
    var basic = require('./locales/all.json');
    var swadesh = require('./locales/swadesh.json');

    var merged = mergeLangObject(basic, swadesh);

    var topics = require('./structure/topics');
    var aac = [];
    for(var topic in topics) {
        if(topics[topic]['type'] === 'aac') {
            var aacLang = require('./locales/'+ topics[topic]['folder'] +'.json');
            mergeLangObject(merged, aacLang);
        }
    }
    console.log(aac);

    return merged;
    /*
      const locales = require.context('./locales', true, /[A-Za-z0-9-_,\s]+\.json$/i)
      const messages = {}
      locales.keys().forEach(key => {
        const matched = key.match(/([A-Za-z0-9-_]+)\./i)
        if (matched && matched.length > 1) {
          const locale = matched[1]
          messages[locale] = locales(key)
        }
      })
      return messages
     */
}

function mergeLangObject(obj1, obj2) {
    for (var lang in obj1) {
        if (obj2[lang]) {
            for (var attrname in obj2[lang]) {
                obj1[lang] [attrname] = obj2[lang][attrname];
            }
        }
    }
    return obj1;
}

function camelize(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
}

export default new VueI18n({
    locale: 'de-CH',
    fallbackLocale: {
        'gsw': ['de-CH']
    },
    silentFallbackWarn: true,
    silentTranslationWarn: true,
    messages: loadLocaleMessages(),
    missing: function (lang, code,wtf) {
        if(wtf.$i18n.te(camelize(code), lang)) {
            return wtf.$i18n.t(camelize(code), lang);
        }

        if (lang === 'en') {
            window.missingCodes.push(code);
            return code;
        }
        return "";
    }
})
