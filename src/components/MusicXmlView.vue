<template>
    <div ref='container' style="width: 100%;"></div>
</template>

<script>
    import {OpenSheetMusicDisplay} from "opensheetmusicdisplay";

    export default {
        //绘制琴谱
        name: "musicxml-view",
        data(){
            return{
                osmd: null,
            }
        },
        mounted() {
            this.osmd = new OpenSheetMusicDisplay(this.$refs.container, {
                autoResize: true,
                backend: 'Canvas',
            });
            this.osmd.setLogLevel('info');
        },
        methods: {
            loadMusicXML(xmlContent) {
                this.osmd
                    .load(xmlContent)
                    .then(
                        () => {
                            this.osmd.render();
                            this.afterRender();
                        },
                        (err) => console.log(err)
                    );
            },
            afterRender() {
                this.osmd.setOptions({autoResize: true});
            },
        }
    }
</script>

<style scoped>

</style>