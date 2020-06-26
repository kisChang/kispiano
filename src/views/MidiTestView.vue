<template>
    <div>
        <h3>Keep it Simple</h3>
        <div>{{midiMsg}}</div>
        <v-btn @click="playOut('C3')">C3</v-btn>
        <v-btn @click="playOut('D#3')">D#3</v-btn>
        <v-btn @click="playOut('G3')">G3</v-btn>
        <div>
            <div v-for="item in loggerText" :key="item">
                {{item}}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import PianoKeyboard from '@/components/PianoKeyboard.vue';

    //必须导入这个，才能启用WebMidi
    import 'web-midi-api';
    //文档 https://github.com/djipco/webmidi
    //import WebMidi, {Input, InputEventNoteon, Output} from "webmidi";

    @Component({
        components: {PianoKeyboard}
    })
    export default class HelloWorld extends Vue {
        loggerText: [string] = [''];
        midiMsg = '';
        midiIn: any;
        midiOut: any;

        mounted(): void {
            /*WebMidi.enable((err) => {
                if (err) {
                    this.midiMsg = "WebMidi could not be enabled." + JSON.stringify(err);
                } else {
                    this.midiMsg = "WebMidi enabled!";

                    window["WebMidi"] = WebMidi;

                    this.midiIn = WebMidi.inputs[0];
                    this.midiOut = WebMidi.outputs[0];

                    if (this.midiIn) {
                        this.midiIn.addListener("noteon", "all", (event: InputEventNoteon) => {
                            this.addLog(String(event));
                        })
                    } else {
                        this.addLog("this.midiIn is null");
                    }
                }
            });*/

            // navigator.requestMIDIAccess().then(this.onMIDISuccess, this.onMIDIFailure);
            }
            onMIDIFailure(msg: any){
                console.log('Failed to get MIDI access - ' + msg);
            }
            onMIDISuccess(midiAccess: any){
                this.midiIn = midiAccess.inputs;
                this.midiOut = midiAccess.outputs;
                //window['midiOut'] = this.midiOut;
            }

        playOut(note: string){
            if (this.midiOut){
                //this.midiOut.playNote(note);
                this.midiOut.forEach(function(port: any){
                    port.send([0x80, 60, 0]);
                });
            }else {
                this.addLog("this.midi Out is null");
            }
        }

        addLog(str: string) {
            this.loggerText.push(new Date().getTime() + " ：" + str);
            while (this.loggerText.length > 10) {
                this.loggerText.shift();
            }
        }
    }
</script>

<style scoped>

</style>
