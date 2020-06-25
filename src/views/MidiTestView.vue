<template>
    <div>
        <h3>Keep it Simple</h3>
        <div>{{midiMsg}}</div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import PianoKeyboard from '@/components/PianoKeyboard.vue';

    //必须导入这个，才能启用WebMidi
    import 'web-midi-api';
    //文档 https://github.com/djipco/webmidi
    import WebMidi, {Input} from "webmidi";

    @Component({
        components: {PianoKeyboard}
    })
    export default class HelloWorld extends Vue {
        midiMsg = '';
        midiIn: null | Input = null;
        midiOut: null | Input = null;

        mounted(): void {
            WebMidi.enable((err) => {
                if (err) {
                    this.midiMsg =  "WebMidi could not be enabled." + JSON.stringify(err);
                } else {
                    this.midiMsg = "WebMidi enabled!";
                    this.midiIn = WebMidi.inputs[0];
                    this.midiOut = WebMidi.inputs[0];
                }
            });
        }
    }
</script>

<style scoped>

</style>
