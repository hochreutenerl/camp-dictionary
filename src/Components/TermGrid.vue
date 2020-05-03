<template>
    <v-container class="terms" fluid grid-list-xl>
        <v-layout wrap justify-space-around>
            <v-flex v-for="(term, i) in terms" v-bind:key="i"
                    class="term xs6 sm4 md3 lg2 xl2">
                <Term :term="term" :index="i"></Term>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import Term from "@/Components/Term";
    export default {
        name: "TermGrid",
        props: ['terms'],
        components: {Term}
    }
</script>

<style scoped>

</style>