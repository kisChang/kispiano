<template>
    <div class="playback-sidebar">
        <div class="sidebar-content">
            <div v-if="playbackEngine.ready">
                <div class="text-center">
                    <b-form-group label="Inline switch style checkboxes">
                        <b-form-checkbox v-model="usingType" class="switch" switch>
                            Using ({{usingType ? 'App Internal' : 'MiDi Keyboard'}})
                        </b-form-checkbox>
                    </b-form-group>
                </div>
                <div v-show="usingType">
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
                <div v-show="!usingType" style="text-align: center;">
                    MiDi: {{midiName}}
                </div>
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
    import {MidiUsb} from "../../utils/MidiUsb";

    export default {
        components: {
            InstrumentControl,
            BpmSlider
        },
        props: {
            playbackEngine: Object,
            playType: Boolean,
        },
        data() {
            const tmp = this.$props.playType;
            return {
                usingType: tmp,
                midiName: '',

                volumeMap : {},
            };
        },
        watch: {
            usingType: 'updateUsingType',
        },
        computed: {
            scoreInstruments() {
                return this.playbackEngine.scoreInstruments;
            },
            bpmDisabled() {
                return this.playbackEngine.state === "PLAYING";
            }
        },
        mounted(){
            this.midiListenerId = MidiUsb.listenerChange(this.midiChangeListener);
        },
        beforeDestroy(){
            MidiUsb.unListenerChange(this.midiListenerId);
        },
        methods: {
            midiChangeListener(midiIn, midiOut){
                this.midiName = midiIn.name;
            },
            updateUsingType(nowVal){
                this.$emit('setPlayType', nowVal);
                if (nowVal){
                    this.playbackEngine.scoreInstruments.forEach(inst => {
                        inst.voices[0].volume = this.volumeMap[inst.id] ? this.volumeMap[inst.id] : 1;
                    })
                }else {
                    this.playbackEngine.scoreInstruments.forEach(inst => {
                        this.volumeMap[inst.id] = inst.voices[0].volume;
                        inst.voices[0].volume = 0;
                    })
                }
            },
        }
    };
</script>
