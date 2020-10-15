<template>
    <v-card @click="switchTopic()" :class="{'linked': link, 'term': true}" :raised="link != undefined"
            height="100%">
        <v-img class="term_image" :src="'/img/terms/' + term + '.png'" alt="" :lazy-src="'/img/terms/empty.png'"></v-img>
        <v-card-title class="term_title">{{ flup($t(term)) }}</v-card-title>
        <v-card-text class="term_descriptions">
            <div class="term_descriptions_container">
                <div v-for="language in current_languages" v-bind:key="language"
                     class="term_description text--primary">
                    <span>{{ $t(term, language) }} ({{language}})</span>
                </div>
            </div>
        </v-card-text>
        <div v-if="link" class="term_info">
            <v-btn icon>
                <v-icon>add_circle</v-icon>
            </v-btn>
        </div>
    </v-card>
</template>

<script>
    export default {
        name: "Term",
        props: ['term', 'index'],
        computed: {
            current_languages: function () {
                return this.$store.state.current_languages;
            },
            link: function () {
                return this.$root.$children[0].index[this.term]['link'];
            },
        },
        methods: {
            switchTopic: function () {
                if (this.link) {
                    this.$root.$children[0].current_topic = this.link;
                }
            },
            flup: function (f) {
                return this.$func.flup(f);
            }
        }
    }
</script>

<style scoped>
    .term {
        cursor: default;
        width: 100%;
    }

    .term_title {
        padding: 8px;
        word-break: normal;
    }

    .term_descriptions {
        padding: 0 8px 8px 8px;
    }

    .term_description {
        clear: left;
    }

    .term.linked {
        cursor: pointer;
    }

    .term_info {
        position: absolute;
        top: 0;
        right: 0;
    }

    @media print {
        .term {
            box-shadow: none;
            border: solid 1px;
            page-break-inside: avoid;
        }
    }
</style>