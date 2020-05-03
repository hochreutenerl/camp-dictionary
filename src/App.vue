<template>
    <v-app id="main" :class="this.$vuetify.breakpoint.name">
        <v-app-bar app clipped-left="" color="green" dark class="app-bar d-print-none d-flex flex-row">
            <v-app-bar-nav-icon @click="drawer = !drawer"/>
            <v-toolbar-title class="pa-0 col-lg-6">{{ flup($t("appname")) }}</v-toolbar-title>
            <v-spacer class="hidden-sm-and-down"></v-spacer>
            <v-text-field flat solo-inverted hide-details prepend-inner-icon="mdi-magnify" :label="flup($t('search'))"
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
                                <v-list-item-title>{{ $t(code) === "" ? code : flup($t(code)) }}
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </template>
                </v-list-item-group>

                <v-divider dark class="my-4"/>

                <v-subheader>{{ flup($t("languages")) }}</v-subheader>
                <MultiLangSelector></MultiLangSelector>
            </v-list>
        </v-navigation-drawer>

        <v-content class="content">
            <TermGrid :terms="current_terms"></TermGrid>
        </v-content>
    </v-app>
</template>

<script>
    import 'material-design-icons-iconfont';

    import index from '@/locales/topics';
    import languages from '@/structure/languages';
    import topics from '@/structure/topics';
    import MultiLangSelector from "@/Components/MultiLangSelector";
    import TermGrid from "@/Components/TermGrid";

    export default {
        name: 'App',

        components: {TermGrid, MultiLangSelector},

        data: () => ({
            drawer: null,
            index: index,
            languages: languages,
            topics: topics,
            current_topic: "basic",
            current_terms: [],
            dictionary: {},
        }),
        methods: {
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
                this.sortTerms();
            },
            languageChanged: function (newLanguage) {
                localStorage.setItem("locale", JSON.stringify(newLanguage));
                this.updateTitle();
                this.sortTerms();
            },
            search: function (search) {
                if (search === "") {
                    this.refreshTerms(this.current_topic);
                } else {
                    var terms = [];
                    var app = this;

                    var ix = this.index;
                    Object.keys(ix).forEach(function (key) {
                        if (app.termMatches(key, search)) {
                            terms.push(key);
                        }
                    });

                    this.current_terms = terms;
                    this.sortTerms();
                }
            },
            termMatches: function (key, search) {
                search = search.toLowerCase();

                if (this.termMatchesLocale(key, search, this.$i18n.locale)) {
                    return true;
                }

                for (var lang in this.current_languages) {
                    if (this.termMatchesLocale(key, search, this.current_languages[lang])) {
                        return true;
                    }
                }
                return false;
            },
            termMatchesLocale: function (key, search, locale) {
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
            sortTerms: function() {
                this.current_terms = this.current_terms.sort((a, b) => {
                    var nameA = this.$i18n.t(a).toLowerCase();
                    var nameB = this.$i18n.t(b).toLowerCase();

                    if(nameA === "" || nameA === null) return 1;
                    if(nameB === "" || nameB === null) return -1;

                    return nameA.localeCompare(nameB);
                });
            }
        },
        created: function () {
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

    .app-bar > div {
        width: 100%;
    }

</style>
