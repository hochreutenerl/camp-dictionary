<template>
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
</template>

<script>
    import languages from '@/structure/languages';

    export default {
        name: "MultiLangSelector",
        data: () => ({
            languages: languages
        }),
        computed: {
            current_languages: {
                get: function () {
                    return this.$store.state.current_languages;
                },
                set: function (newLanguages) {
                    this.$store.commit('setCurrentLanguages', newLanguages);
                }
            }
        },
        methods: {}
    }
</script>

<style scoped>

</style>