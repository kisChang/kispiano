<template>
    <div>
        <b-navbar variant="faded" type="light" style="padding: 0;">
            <b-navbar-brand to="/" style="position: relative;margin: auto;">Kis Piano</b-navbar-brand>
        </b-navbar>

        <MusicXmlScore v-if="mounted" style="margin-bottom: 110px"
                @osmdInit="osmdInit" @scoreLoaded="scoreLoaded"
                :score="selectedScore" :ready="pbEngineReady"/>
        <div style="position: fixed; bottom: 0;left: 0;right: 0;background: #FFF">
            <PlaybackControls :playbackEngine="pbEngine" :scoreTitle="scoreTitle" />

            <div style="position: fixed;bottom: 0;right: 0;">
                <b-btn v-b-modal.modalPlaybackSetting>
                    <b-icon-egg-fried></b-icon-egg-fried>
                </b-btn>
            </div>
        </div>
        <b-modal id="modalPlaybackSetting" title="播放设置" centered
                 static ok-only ok-title="确定">
            <PlaybackSidebar :playbackEngine="pbEngine" :playType="playType"
                             v-if="pbEngineReady" @setPlayType="setPlayType"/>
        </b-modal>
    </div>
</template>

<script>
    import PlaybackSidebar from "@/components/osmd/PlaybackSidebar.vue";
    import PlaybackControls from "@/components/osmd/PlaybackControls.vue";
    import MusicXmlScore from "@/components/osmd/MusicXmlScore.vue";
    import PlaybackEngine from "osmd-audio-player";
    import {MidiUsb} from "../utils/MidiUsb";

    export default {
        name: "app",
        components: {
            MusicXmlScore,
            PlaybackSidebar,
            PlaybackControls
        },
        data() {
            return {
                pbEngine: new PlaybackEngine(),
                pbEngineReady: false,
                selectedScore: null,
                osmd: null,
                scoreTitle: "",
                mounted: false,

                playType: true,
            };
        },
        computed: {},
        methods: {
            osmdInit(osmd) {
                this.osmd = osmd;
                if (this.$route.query.id){
                    this.scoreChanged(`/musicxml/${this.$route.query.id}.xml`);
                }else {
                    this.scoreChanged(this.$route.query.url);
                }
                this.pbEngine.on("iteration", this.playerEngineIterationEvent);
            },
            playerEngineIterationEvent(noteListArg){
                // window['note'] = noteListArg;

                noteListArg.forEach(x => {
                    if (!this.playType){
                        MidiUsb.midiOutOn(x.halfTone, 0x7F);
                        setTimeout(() => {
                            MidiUsb.midiOutOff(x.halfTone, 0x7F);
                        }, 200)
                    }
                })
            },
            async scoreLoaded() {
                console.log("Score loaded");
                if (this.osmd.sheet.title) this.scoreTitle = this.osmd.sheet.title.text;
                await this.pbEngine.loadScore(this.osmd);
                console.log("pbEngine ready");
                this.pbEngineReady = true;
            },
            scoreChanged(scoreUrl) {
                if (this.pbEngine.state === "PLAYING") this.pbEngine.stop();
                this.selectedScore = scoreUrl;
                this.pbEngineReady = false;
            },

            setPlayType(playType){
                this.playType = playType;
            },
        },
        mounted() {
            setTimeout(() => {
                this.mounted = true;
            }, 200);

            ////
            MidiUsb.init().then().catch(reason => {
                console.warn(reason);
            });
        }
    };
</script>

<style lang="scss">
    #app {
        font-family: "Avenir", Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
    }
</style>