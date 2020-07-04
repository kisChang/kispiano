<template>
    <div class="text-xs-center">
        <b-form-input v-if="this.playbackEngine && this.playbackEngine.iterationSteps > 0" type="range"
                      :value="this.playbackEngine.currentIterationStep"
                      :min="0"
                      :max="this.playbackEngine.iterationSteps"
                      :step="1"
                      @input="val => this.playbackEngine.jumpToStep(val)">
        </b-form-input>

        <div class="text-center" style="padding: 0 10px;">{{ scoreTitle }}</div>

        <div class="text-center">
            <b-btn icon @click="playbackEngine.play()" v-if="playbackEngine.state !== 'PLAYING'">
                <b-icon-play-fill/>
            </b-btn>
            <b-btn v-else icon @click="playbackEngine.pause()">
                <b-icon-pause-fill/>
            </b-btn>
            <b-btn icon @click="playbackEngine.stop()">
                <b-icon-stop-fill/>
            </b-btn>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            playbackEngine: Object,
            scoreTitle: String
        },
        beforeDestroy() {
            if (this.playbackEngine.state === "PLAYING") this.playbackEngine.stop();
        }
    };
</script>

<style lang="scss">
    .v-bottom-sheet.v-dialog.v-bottom-sheet--inset {
        max-width: 700px;
    }

    .v-input.progress-slider {
        margin-top: -24px;
    }
</style>
