<template>
    <v-card>
        <v-img class="term_image" :src="'/img/terms/' + term + '.png'" alt=""></v-img>
        <v-card-title>{{ flup($t(term)) }}</v-card-title>
        <v-card-text class="term_descriptions">
            <div v-for="language in current_languages" v-bind:key="language"
                 class="term_description text--primary">
                {{ $t(term, language) }} ({{language}})
            </div>
        </v-card-text>
    </v-card>
</template>

<script>
    export default {
        name: "Term",
        props: ['term', 'index'],
        computed: {
            current_languages: function() {
                return this.$store.state.current_languages;
            }
        },
        methods: {
            flup: function(f) {
                return this.$func.flup(f);
            }
        }
    }
</script>

<style scoped>

</style>