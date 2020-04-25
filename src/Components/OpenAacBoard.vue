<template>
    <div class="obf-viewer">
        <div class="toHome" @click="open">
            <v-card>
                <v-card-title class="justify-center pa-2"><v-icon>home</v-icon></v-card-title>
            </v-card>
        </div>
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
        props: ['file', 'folder'],
        created: function () {
            this.open();
        },
        methods: {
            open() {
                this.manifest = require('@/boards/'+this.folder+'/manifest');
                this.setBoard(this.manifest.root);
            },
            setBoard(board) {
                var b = require('@/boards/'+this.folder+'/' + board);
                this.board = JSON.parse(b.default);
            },
            imgSource: function (imageId) {
                var i = require('@/boards/'+this.folder+'/' + this.manifest.paths.images[imageId]);
                return i;
            },
            switchBoard: function (board) {
                if(board) {
                    this.setBoard(this.manifest.paths.boards[board.id]);
                }
            }
        },
        watch: {
            folder: function() {
              this.open();
            },
        },
        computed: {},
    }
</script>

<style scoped>

</style>