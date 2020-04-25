<template>
    <div>
        <obf-board :board="board"></obf-board>
    </div>
</template>

<script>
    import ObfBoard from "@/Components/ObfBoard";
    
    export default {
        name: "OpenAacBoard",
        components: {ObfBoard},
        data: () => ({
            manifest: {},
            board: {},
        }),
        props: ['file'],
        created: function () {
            this.open();
        },
        methods: {
            open() {
                this.manifest = require('@/boards/current/manifest');
                this.setBoard(this.manifest.root);
            },
            setBoard(board) {
                var b = require('@/boards/current/' + board);
                this.board = JSON.parse(b.default);
            },
            imgSource: function (imageId) {
                var i = require('@/boards/current/' + this.manifest.paths.images[imageId]);
                return i;
            },
            switchBoard: function (board) {
                if(board) {
                    this.setBoard(this.manifest.paths.boards[board.id]);
                }
            }
        },
        computed: {},
    }
</script>

<style scoped>

</style>