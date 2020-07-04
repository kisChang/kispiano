<template>
    <div class="playback-sidebar">
        <div class="sidebar-content">
            <div v-if="playbackEngine.ready">
                <h5>速度 BPM {{ playbackEngine.denominator ? `(1/${playbackEngine.denominator})` : "" }}</h5>
                <BpmSlider
                        :bpm="playbackEngine.playbackSettings.bpm"
                        @update:bpm="val => playbackEngine.setBpm(val)"
                        :disabled="bpmDisabled"
                ></BpmSlider>
                <h5>音道</h5>
                <InstrumentControl
                        v-for="instrument in scoreInstruments"
                        :key="instrument.Id"
                        :playbackEngine="playbackEngine"
                        :instrument="instrument"
                />
            </div>
            <div v-else>
                Loading...
            </div>
        </div>
    </div>
</template>

<script>
    import InstrumentControl from "./InstrumentControl.vue";
    import BpmSlider from "./BpmSlider";

    export default {
        components: {
            InstrumentControl,
            BpmSlider
        },
        props: {
            playbackEngine: Object
        },
        data() {
            return {};
        },
        computed: {
            scoreInstruments() {
                return this.playbackEngine.scoreInstruments;
            },
            bpmDisabled() {
                return this.playbackEngine.state === "PLAYING";
            }
        }
    };
</script>
