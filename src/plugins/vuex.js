import Vue from 'vue'
import Vuex from 'vuex'
import index from '@/locales/topics';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        current_languages: ["en"],
        current_topic: "",
        current_terms: [],
        index: index
    },
    mutations: {
        setCurrentLanguages(store, lang) {
            store.current_languages = lang;
            localStorage.setItem("current_languages", JSON.stringify(lang));
        },
        initStore(store) {
            var storedLanguages = JSON.parse(localStorage.getItem("current_languages"));
            if (storedLanguages) {
                store.current_languages = storedLanguages;
            }

            store.index = index;
        }
    },
    actions: {

    }
});