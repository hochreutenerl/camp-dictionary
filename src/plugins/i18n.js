import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n);

window.missingCodes = [];

function loadLocaleMessages() {
    var basic = require('@/locales/all.json');
    var swadesh = require('@/locales/swadesh.json');

    var merged = mergeLangObject(basic, swadesh);

    var topics = require('@/structure/topics');
    var aac = [];
    for(var topic in topics) {
        if(topics[topic]['type'] === 'aac') {
            var aacLang = require('@/locales/'+ topics[topic]['folder'] +'.json');
            mergeLangObject(merged, aacLang/*, topics[topic]['folder']*/);
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

function mergeLangObject(obj1, obj2, prefix) {
    for (var lang in obj1) {
        if (obj2[lang]) {
            for (var attrname in obj2[lang]) {
                if(prefix != undefined) {
                    if(!obj1[lang][prefix]) {
                        obj1[lang][prefix] = {};
                    }
                    obj1[lang][prefix][attrname] = obj2[lang][attrname];
                } else {
                    obj1[lang][attrname] = obj2[lang][attrname];
                }
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
        if(wtf != null && wtf.$i18n.t(camelize(code), lang) !== "") {
            return wtf.$i18n.t(camelize(code), lang);
        }

        if(window.dict) {
            var topic = window.dict.$root.$children[0].current_topic;

            if (lang === 'en' && (topic === 'aac1' || topic === 'aac2')) {
                window.missingCodes.push(code);
                return code;
            }
        }
        return "";
    }
})