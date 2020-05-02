import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n);

function loadLocaleMessages() {
    var languages = require('@/structure/languages');
    const messages = {}
    for(var lang in languages) {
        messages[lang] = (require('@/locales/' + lang + '.json'));
    }
    return messages;
}

export default new VueI18n({
    locale: 'de-CH',
    fallbackLocale: {
        'gsw': ['de-CH']
    },
    silentFallbackWarn: true,
    silentTranslationWarn: true,
    messages: loadLocaleMessages(),
    missing: function () {
        return "";
    }
})
