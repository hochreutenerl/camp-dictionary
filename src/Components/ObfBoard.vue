<template>
    <div class="obf-board">
        <table>
            <tr v-for="i in board.grid.rows" :key="i">
                <td v-for="j in board.grid.columns" :key="j">
                    <obf-board-tile :tile="getTile(i,j)"></obf-board-tile>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
    import ObfBoardTile from "@/Components/ObfBoardTile";
    export default {
        name: "ObfBoard",
        components: {ObfBoardTile},
        props: ['board'],
        methods: {
            getTile: function(i, j) {
                var id = this.board.grid.order[i-1][j-1];
                return this.getTileById(id);
            },
            getTileById: function(id) {
                if(id == null) {
                    return {
                        "id": null,
                    };
                }
                return this.board.buttons.filter(function (tile) {
                    return tile.id === id;
                })[0];
            },
            imgSource: function(imageId) {
                return this.$parent.imgSource(imageId);
            },
            switchBoard: function(board) {
                return this.$parent.switchBoard(board);
            }
        }
    }
</script>

<style scoped>

</style>