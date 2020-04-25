<template>
    <v-app id="main">
        <v-app-bar app clipped-left="" color="green" dark class="d-print-none">
            <v-app-bar-nav-icon @click="drawer = !drawer"/>
            <v-toolbar-title class="title col-5">{{ flup($t("appname")) }}</v-toolbar-title>
            <v-spacer/>
            <div class="locale-changer align-center float-right col-5">
                <v-select :items="languagesSelector" v-model="$i18n.locale" @change="languageChanged"></v-select>
            </div>
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
            <v-container class="terms" fluid grid-list-xl>
                <v-layout wrap justify-space-around>
                    <div class="aac" v-if="current_topic === 'aac'">
                        <open-aac-board></open-aac-board>
                    </div>
                    <v-flex v-else v-for="term in current_terms" v-bind:key="term"
                            class="term xs6 sm4 md3 lg2 xl2">
                        <v-card>
                            <v-img class="term_image" :src="'./img/terms/' + term + '.png'" alt=""></v-img>
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
    import index from './structure/index';
    import languages from './structure/languages';
    import topics from './structure/topics';

    import OpenAacBoard from "@/Components/OpenAacBoard";

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
            flup: function (text) {
                if (text[0]) {
                    return text.replace(/^./, text[0].toUpperCase());
                }
            },
            updateTitle: function () {
                window.document.title = this.flup(this.$i18n.t("appname"));
            },
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
            },
        }
    };
</script>

<style>
    .lang_check {
        margin: 0 !important;
    }

    .locale-changer {
        margin-top: 18px;
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

</style>
