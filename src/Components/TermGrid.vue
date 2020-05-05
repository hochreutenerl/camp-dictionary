<template>
    <div class="term_grid">
        <v-container fluid grid-list-md>
            <h1>{{ flup($t(current_topic)) }}</h1>
            <Explanation :topic="current_topic"></Explanation>
            <v-layout row wrap>
                <v-flex v-for="(term, i) in terms" v-bind:key="i" xl2 lg2 md3 sm4 xs4 class="pa-1">
                    <Term :term="term" :index="i"></Term>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
    import Term from "@/Components/Term";
    import Explanation from "@/Components/Explanation";

    export default {
        name: "TermGrid",
        props: ['terms'],
        components: {Explanation, Term},
        computed: {
            current_topic: function () {
                return this.$root.$children[0].current_topic;
            },
        },
        methods: {
            flup: function (text) {
                return this.$func.flup(text);
            },
        }
    }
</script>

<style scoped>
</style>