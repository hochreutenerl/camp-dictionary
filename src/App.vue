<template>
    <v-app id="main" :class="this.$vuetify.breakpoint.name">
        <v-app-bar app clipped-left="" color="green" dark class="app-bar d-print-none d-flex flex-row">
            <v-app-bar-nav-icon @click="drawer = !drawer"/>
            <v-toolbar-title class="pa-0 col-lg-6">{{ flup($t("appname")) }}</v-toolbar-title>
            <v-spacer class="hidden-sm-and-down"></v-spacer>
            <v-text-field flat solo-inverted hide-details prepend-inner-icon="mdi-magnify" label="Search"
                          class="search-bar col-lg-2 pa-1" @input="search"/>
            <v-spacer></v-spacer>
            <v-select class="float-right locale-changer pa-1 flex-column col-lg-2 flex-shrink-1"
                      :items="languagesSelector" v-model="$i18n.locale" @change="languageChanged"></v-select>
        </v-app-bar>

        <v-navigation-drawer v-model="drawer" app clipped color="grey lighten-4" class="d-print-none">
            <v-list class="grey lighten-4">

                <v-subheader>{{ flup($t("topics")) }}</v-subheader>
                <v-list-item-group v-model="current_topic">
                    <template v-for="(topic, code) in topics">
                        <v-list-item v-if="!topic.hide" :key="`item-${code}`" :value="code">
                            <v-list-item-content>
                                <v-list-item-title>{{ $t(code) === "" ? topic.title : flup($t(code)) }}
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </template>
                </v-list-item-group>

                <v-divider dark class="my-4"/>

                <v-subheader>{{ flup($t("languages")) }}</v-subheader>
                <v-list-item-group v-model="current_languages" multiple>
                    <template v-for="(lang, code) in languages">
                        <v-list-item dense v-if="!lang.hide" :key="`item-${code}`" :value="code">
                            <template v-slot:default="{ active, toggle }">
                                <v-list-item-content>
                                    <v-list-item-title v-text="lang.name"></v-list-item-title>
                                </v-list-item-content>

                                <v-list-item-action class="lang_check">
                                    <v-checkbox :input-value="active" :true-value="code" @click="toggle"
                                                color="green"></v-checkbox>
                                </v-list-item-action>
                            </template>
                        </v-list-item>
                    </template>
                </v-list-item-group>


            </v-list>
        </v-navigation-drawer>

        <v-content class="content">
            <open-aac-board v-if="topics[current_topic]['type'] === 'aac'"
                            :folder="topics[current_topic]['folder']"></open-aac-board>
            <v-container v-else class="terms" fluid grid-list-xl>
                <v-layout wrap justify-space-around>
                    <v-flex v-for="(term, i) in current_terms" v-bind:key="i"
                            class="term xs6 sm4 md3 lg2 xl2">
                        <v-card>
                            <v-img class="term_image" :src="imgPath(term,i)" alt=""></v-img>
                            <v-card-title>{{ flup($t(term)) }}</v-card-title>
                            <v-card-text class="term_descriptions">
                                <div v-for="language in current_languages" v-bind:key="language"
                                     class="term_description text--primary">
                                    {{ $t(term, language) }} ({{language}})
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
    import 'material-design-icons-iconfont';

    import index from './structure/index';
    import languages from './structure/languages';
    import topics from './structure/topics';

    import OpenAacBoard from "@/Components/OpenAacBoard";
    import Swadesh from "@/locales/swadesh";

    export default {
        name: 'App',

        components: {OpenAacBoard},

        data: () => ({
            drawer: null,
            index: index,
            languages: languages,
            topics: topics,
            current_topic: "basic",
            current_languages: ["en"],
            current_terms: [],
            dictionary: {},
            locales: ["de"]
        }),
        methods: {
            refreshTerms: function (newTopic) {
                var terms = [];

                if (newTopic === 'swadesh') {
                    for (var key in Swadesh["en"]) {
                        terms.push(key);
                    }
                }

                var ix = this.index;
                Object.keys(ix).forEach(function (key) {
                    ix[key].topics.forEach(function (topic) {
                        if (topic == newTopic) {
                            terms.push(key);
                        }
                    });
                });


                this.current_terms = terms;
            },
            languageChanged: function (newLanguage) {
                localStorage.setItem("locale", JSON.stringify(newLanguage));
                this.updateTitle();
            },
            search: function (search) {
                if (search === "") {
                    this.refreshTerms(this.current_topic);
                } else {
                    var terms = [];
                    var app = this;

                    var ix = this.index;
                    Object.keys(ix).forEach(function (key) {
                        if(app.termMatches(key, search)) {
                            terms.push(key);
                        }
                    });

                    this.current_terms = terms;
                }
            },
            termMatches: function(key, search) {
                search = search.toLowerCase();

                if(this.termMatchesLocale(key, search, this.$i18n.locale)) {
                    return true;
                }

                for(var lang in this.current_languages) {
                    if(this.termMatchesLocale(key, search, this.current_languages[lang])) {
                        return true;
                    }
                }
                return false;
            },
            termMatchesLocale: function(key, search, locale) {
                var trans = this.$i18n.t(key, locale);
                return !!(trans != null && trans.toLowerCase().includes(search));

            },
            flup: function (text) {
                if (text[0]) {
                    return text.replace(/^./, text[0].toUpperCase());
                }
            },
            updateTitle: function () {
                window.document.title = this.flup(this.$i18n.t("appname"));
            },
            imgPath: function (term, i) {
                if (this.current_topic === 'swadesh') {
                    return './img/swadesh/' + (i + 1) + '.png';
                } else {
                    return './img/terms/' + term + '.png';
                }
            }
        },
        created: function () {
            var storedLanguages = JSON.parse(localStorage.getItem("current_languages"));
            if (storedLanguages) {
                this.current_languages = storedLanguages;
            }

            var storedLanguage = JSON.parse(localStorage.getItem("locale"));
            if (storedLanguage) {
                this.$i18n.locale = storedLanguage;
            }

            var storedTopic = JSON.parse(localStorage.getItem("current_topic"));
            if (storedTopic) {
                this.current_topic = storedTopic;
            }

            this.refreshTerms(this.current_topic);
            this.updateTitle();
        },
        watch: {
            current_topic: function (newTopic) {
                this.refreshTerms(newTopic);
                localStorage.setItem("current_topic", JSON.stringify(newTopic));
            },
            current_languages: function (newLanguages) {
                localStorage.setItem("current_languages", JSON.stringify(newLanguages));
            },
        },
        computed: {
            languagesSelector: function () {
                var e = [];
                for (var lang in this.languages) {
                    if (this.languages[lang]['pageLocale'] === true) {
                        e.push({text: this.languages[lang]['name'], value: lang});
                    }
                }
                return e;
            }
        }
    };
</script>

<style>
    .lang_check {
        margin: 0 !important;
    }

    .xs .locale-changer {
        width: 80px;
    }

    .locale-changer {
        margin-top: 20px !important;
        margin-bottom: 0 !important;
    }

    .title {
        padding-left: 0 !important;
    }

    .term {
        max-width: 180px;
    }

    @media print {
        .content {
            padding: 0 !important;
        }
    }

    .search-bar {
        min-width: 48px !important;
    }

    .aac {
        width: 100%;
    }

    .app-bar > div {
        width: 100%;
    }

</style>
