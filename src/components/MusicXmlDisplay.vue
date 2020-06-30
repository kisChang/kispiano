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
                horizontalScreen: false,
            }
        },
        mounted() {
            this.checkHorizontalScreen();

            this.osmd = new OpenSheetMusicDisplay(this.$refs.container, {
                autoResize: true, backend: 'Svg',
            });
            this.osmd.setLogLevel('info');
        },
        methods: {
            loadMusicXML(xmlContent) {
                this.osmd
                    .load(xmlContent)
                    .then(
                        () => {
                            this.osmd.zoom = this.horizontalScreen ? 0.5 : 0.4;
                            this.osmd.render();
                            this.afterRender();
                        },
                        (err) => console.log(err)
                    );
            },
            afterRender() {
                this.osmd.setOptions({autoResize: true});
            },
            checkHorizontalScreen() {
                if (window.orientation == 180 || window.orientation == 0) {
                    this.horizontalScreen = false;
                }
                if (window.orientation == 90 || window.orientation == -90) {
                    //alert("横屏状态！")
                    this.horizontalScreen = true;
                }
            }
        }
    }
</script>

<style scoped>

</style>