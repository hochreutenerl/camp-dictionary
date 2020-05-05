<template>
    <v-expansion-panels v-if="content">
        <v-expansion-panel>
            <v-expansion-panel-header>{{ $t('details') }}</v-expansion-panel-header>
            <v-expansion-panel-content>
                <div class="topic_explanation" v-html="content"></div>
            </v-expansion-panel-content>
        </v-expansion-panel>
    </v-expansion-panels>
</template>

<script>
    import marked from 'marked';

    export default {
        name: "Explanation",
        props: ['topic'],
        computed: {
            content: function () {
                try {
                    var file = require('@/explanations/' + this.topic + '-' + this.$i18n.locale + '.md');
                    return marked(file.default, {});
                } catch (e) {
                    try {
                        file = require('@/explanations/' + this.topic + '.md');
                        return marked(file.default);
                    } catch (e) {
                        return marked("");
                    }
                }
            }
        }
    }
</script>

<style>

    .topic_explanation th {
        text-align: left;
    }

    .topic_explanation table {
        width: 100%;
    }
</style>