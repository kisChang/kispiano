<template>
    <div>
        <div class="score-progress" v-if="scoreLoading || !ready">
            <div class="spinner spinner-grow text-primary" role="status" style="margin-top: 20%;">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
        <div class="score" ref="scorediv" v-show="!scoreLoading" :style="{opacity: ready ? 100 : 0}"></div>
    </div>
</template>

<script>
    import axios from "axios";
    import {OpenSheetMusicDisplay} from "opensheetmusicdisplay";

    export default {
        props: ["score", "ready"],
        data() {
            return {
                osmd: null,
                scoreLoading: false,
                horizontalScreen: false,
            };
        },
        watch: {
            score(val, oldVal) {
                if (!val || val === oldVal) return;
                this.loadScore(val);
            }
        },
        async mounted() {
            this.osmd = new OpenSheetMusicDisplay(this.$refs.scorediv, {
                followCursor: true, autoResize: false,
                backend: 'svg',
                // backend: "canvas",

                drawTitle: false, drawSubtitle: false,
            });
            //// me
            this.osmd.zoom = this.horizontalScreen ? 0.5 : 0.4;
            ////
            this.$emit("osmdInit", this.osmd);
            if (this.score) this.loadScore(this.score);
        },
        methods: {
            async loadScore(scoreUrl) {
                this.scoreLoading = true;
                const scoreXml = await axios.get(scoreUrl);
                await this.osmd.load(scoreXml.data);
                this.scoreLoading = false;
                await this.$nextTick();
                //// me
                this.osmd.zoom = this.horizontalScreen ? 0.5 : 0.4;
                ////
                await this.osmd.render();
                this.$emit("scoreLoaded");
            },

            checkHorizontalScreen() {
                if (window.orientation == 180 || window.orientation == 0) {
                    this.horizontalScreen = false;
                }
                if (window.orientation == 90 || window.orientation == -90) {
                    this.horizontalScreen = true;
                }
            }
        }
    };
</script>

<style scoped lang="scss">
    .score {
        width: 100%;
        -webkit-box-shadow: 0px 4px 5px 0px rgba(0, 0, 0, 0.4);
        -moz-box-shadow: 0px 4px 5px 0px rgba(0, 0, 0, 0.4);
        box-shadow: 0px 4px 5px 0px rgba(0, 0, 0, 0.4);
    }

    .score-progress {
        text-align: center;
    }
</style>

<style lang="scss">
    .score {
        img {
            z-index: 1 !important;
        }
    }
</style>
