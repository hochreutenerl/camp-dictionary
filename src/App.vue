<template>
    <v-app id="main">
        <v-app-bar app clipped-left="" color="green" dark>
            <v-app-bar-nav-icon @click="drawer = !drawer"/>
            <span class="title ml-3 mr-5">Dictionary</span>
        </v-app-bar>

        <v-navigation-drawer v-model="drawer" app clipped color="grey lighten-4">
            <v-list class="grey lighten-4">

                <v-subheader>Topics</v-subheader>
                <v-list-item-group v-model="current_topic">
                    <template v-for="(topic, code) in topics">
                        <v-list-item v-if="!topic.hide" :key="`item-${code}`" :value="code">
                            <v-list-item-content>
                                <v-list-item-title v-text="topic.title"></v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </template>
                </v-list-item-group>

                <v-divider dark class="my-4"/>

                <v-subheader>Languages</v-subheader>
                <v-list-item-group v-model="current_languages" multiple>
                    <template v-for="(lang, code) in languages">
                        <v-list-item dense v-if="!lang.hide" :key="`item-${code}`" :value="code">
                            <template v-slot:default="{ active, toggle }">
                                <v-list-item-content>
                                    <v-list-item-title v-text="lang.name"></v-list-item-title>
                                </v-list-item-content>

                                <v-list-item-action class="lang_check">
                                    <v-checkbox :input-value="active" :true-value="code" @click="toggle"></v-checkbox>
                                </v-list-item-action>
                            </template>
                        </v-list-item>
                    </template>
                </v-list-item-group>


            </v-list>
        </v-navigation-drawer>

        <v-content>
            <v-container class="terms" fluid grid-list-xl>
                <v-layout wrap justify-space-around>
                    <v-flex v-for="term in current_terms" v-bind:key="term" class="term">
                        <v-card width="180px">
                            <v-img v-if="index[term].image" class="term_image" :src="index[term].image" alt="">
                            </v-img>
                            <v-card-text class="term_descriptions">
                                <div v-for="language in current_languages" v-bind:key="language"
                                     class="term_description">
                                    {{language}}: {{ $t(term, language) }}
                                </div>
                            </v-card-text>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
    import index from './structure/index';
    import languages from './structure/languages';
    import topics from './structure/topics';

    export default {
        name: 'App',

        components: {},

        data: () => ({
            drawer: null,
            index: index,
            languages: languages,
            topics: topics,
            current_topic: "basic",
            current_languages: ["en", "de-ch"],
            current_terms: [],
            dictionary: {},
        }),
        methods: {
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
            },
            refreshTerms: function (newTopic) {
                var terms = [];
                var ix = this.index;
                Object.keys(ix).forEach(function (key) {
                    ix[key].topics.forEach(function (topic) {
                        if (topic == newTopic) {
                            terms.push(key);
                        }
                    });
                });

                this.current_terms = terms;
            }
        },
        created: function () {
            var storedLanguages = JSON.parse(localStorage.getItem("current_languages"));
            if (storedLanguages) {
                this.current_languages = storedLanguages;
            }

            var storedTopic = JSON.parse(localStorage.getItem("current_topic"));
            if (storedTopic) {
                this.current_topic = storedTopic;
            }

            this.refreshTerms(this.current_topic);
        },
        watch: {
            current_topic: function (newTopic) {
                this.refreshTerms(newTopic);
                localStorage.setItem("current_topic", JSON.stringify(newTopic));
            },
            current_languages: function (newLanguages) {
                localStorage.setItem("current_languages", JSON.stringify(newLanguages));
            },

        }
    };
</script>

<style>
    .lang_check {
        margin: 0 !important;
    }
</style>
