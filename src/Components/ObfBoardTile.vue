<template>
    <v-card v-if="tile.id" :class="this.imageSize + ' obf-tile'" :style="style" @click="switchBoard(tile.load_board)">
        <v-img class="obf-image" :src="imgSource(tile.image_id)" :alt="tile.label"/>
        <span v-if="tile.load_board != null" class="link">&nbsp;</span>

        <v-card-title class="term_title justify-center pa-0">{{ $t(tile.label) }}</v-card-title>
        <v-card-text class="term_descriptions text-center">
            <div v-for="language in current_languages" v-bind:key="language" class="obf-label">
                {{ $t(tile.label, language) }} ({{language}})
            </div>
        </v-card-text>
    </v-card>
</template>

<script>
    export default {
        name: "ObfBoardTile",
        props: ['tile'],
        methods: {
            imgSource: function (imageId) {
                return this.$parent.imgSource(imageId);
            },
            switchBoard: function (board) {
                return this.$parent.switchBoard(board);
            }
        }
        ,
        computed: {
            style: function () {
                var style = '';
                if (this.tile.background_color) {
                    style += 'background-color: ' + this.tile.background_color + ';';
                }
                if (this.tile.border_color) {
                    style += 'border-color: ' + this.tile.border_color + ';';
                }
                return style;
            },
            current_languages: function () {
                return this.$root.$children[0].$data.current_languages;
            },
            imageSize: function () {
                return (this.$vuetify.breakpoint.name);
            }
        }
    }
</script>

<style scoped>
    .obf-tile {
        position: relative;
    }

    .obf-image {
        margin: 0 auto;
        max-height: 180px;
        max-width: 200px;
    }

    .lg .obf-image {
        max-height: 180px;
        max-width: 200px;
    }

    .md .obf-image {
        max-height: 180px;
        max-width: 180px;
    }

    .sm.obf-tile .v-card__title, .xs.obf-tile .v-card__title, .sm.obf-tile .v-card__text, .xs.obf-tile .v-card__text {
        font-size: 0.75rem;
        line-height: 1rem;
    }

    .sm .obf-image {
        max-height: 150px;
        max-width: 130px;
    }

    .xs .obf-image {
        max-height: 150px;
        max-width: 105px;
    }

    .6col {

    .md .obf-image {
        max-width: 150px;
    }

    .sm .obf-image {
        max-width: 80px;
        max-height: 80px;
    }

    .xs .obf-image {
        max-width: 70px;
    }

    }

    .link {
        position: absolute;
        top: 0;
        right: 0;
        width: 15px;
        height: 15px;
        background-color: red;
        border-radius: 50%;
    }

    .term_title {
        text-align: center;
    }

    .term_descriptions {
        padding-bottom: 0;
    }


</style>