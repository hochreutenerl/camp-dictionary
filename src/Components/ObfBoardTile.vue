<template>
    <div v-if="tile.id" class="obf-tile" :style="style" @click="switchBoard(tile.load_board)">
        <span v-if="tile.load_board != null">!</span>

        <span>{{ $t(tile.label) }}</span>
        <img class="obf-image" :src="imgSource(tile.image_id)" :alt="tile.label">
        <div class="term_descriptions">
            <div v-for="language in current_languages" v-bind:key="language" class="obf-label">
                {{ $t(tile.label, language) }} ({{language}})
            </div>
        </div>
    </div>
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
            current_languages: function() {
                return this.$root.$children[0].$data.current_languages;
            }
        }
    }
</script>

<style scoped>
    .obf-tile {
        display: grid;
        border-width: 2px;
        border-style: solid;

        text-align: center;
    }

    .obf-image {
        width: 100px;
    }
</style>