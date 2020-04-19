<template>
    <div id="app">
        <ul>
            <div v-for="(lang, code) in languages" v-bind:key="code">
                <li v-if="!lang.hide">
                    <a @click.prevent="toggleLanguage(code)">
                        <strong v-if="current_languages.includes(code)">{{ lang.name }}</strong>
                        <span v-else>{{ lang.name }}</span>
                    </a>
                </li>
            </div>
        </ul>

        <ul>
            <div v-for="topic in topics" v-bind:key="topic">
                <li v-if="!topic.hide">
                    <a @click.prevent="changeTopic(topic)">
                        <strong v-if="current_topic == topic">{{ topic }}</strong>
                        <span v-else>{{ topic }}</span>
                    </a>
                </li>
            </div>
        </ul>

        <div class="terms">
            <div v-for="term in current_terms" v-bind:key="term" class="term">
                <div class="term_image" v-if="index[term].image">
                    <img :src="index[term].image" alt="">
                </div>
                <div class="term_descriptions">
                    <div v-for="language in current_languages" v-bind:key="language" class="term_description">
                        <p>{{ loadTerm(term, language) }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import index from './structure/index';
    import languages from './structure/languages';
    import topics from './structure/topics';

    export default {
        name: 'App',
        components: {},
        data: function () {
            return {
                index: index,
                languages: languages,
                topics: topics,
                current_topic: "basic",
                current_languages: ["en"],
                current_terms: [],
                dictionary: {},
            }
        },
        methods: {
            changeTopic: function (topic) {
                this.current_topic = topic;
                this.getCurrentTerms();
            },
            toggleLanguage: function (language) {
                if (this.current_languages.includes(language)) {
                    this.current_languages = this.current_languages.filter(function (l) {
                        return (l != language);
                    });
                } else {
                    this.current_languages.push(language);
                }
            },
            getCurrentTerms: function () {
                var terms = [];
                var ix = this.index;
                var tx = this.current_topic;
                Object.keys(ix).forEach(function (key) {
                    ix[key].topics.forEach(function (topic) {
                        if (topic == tx) {
                            terms.push(key);
                        }
                    });
                });

                this.current_terms = terms;
            },
            loadDictionary: function () {
                var dict = this.dictionary;
                Object.entries(this.languages).forEach(function (value) {
                    dict[value[0]] = require('./lang/' + value[0]);
                });
            },
            loadTerm: function (term, language) {
                if (term in this.dictionary[language]) {
                    return this.dictionary[language][term];
                } else {
                    return this.loadFallback(term, language);
                }
            },
            loadFallback: function (term, language) {
                if ('fallback' in this.languages[language]) {
                    var fbl = this.languages[language]['fallback'];
                    return this.loadTerm(term, fbl);
                } else {
                    return "";
                }
                /*
                var fb = .fallback;

                return (fb !== undefined) ? this.loadTerm(term, fb) : "";
                 */
            }
        },
        mounted() {
            this.getCurrentTerms();
            this.loadDictionary();
        }
    }
</script>

<style>

</style>
