<template>
    <div>
        <h3>Keep it Simple</h3>
        <div>{{midiMsg}}</div>
        <b-button @click="playOut([144, 60, 100])">C3</b-button>
        <b-button @click="playOut([144, 60, 50])">D#3</b-button>
        <b-button @click="playOut([144, 60, 127])">G3</b-button>
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
    import "bootstrap-vue/src/components/modal/index";

    @Component({
        components: {PianoKeyboard}
    })
    export default class HelloWorld extends Vue {
        loggerText: [string] = [''];
        midiMsg = '';
        midi: any;
        midiIn: any;
        midiOut: any;

        mounted(): void {
            if (!('requestMIDIAccess' in navigator)) {
                this.$bvModal.msgBoxOk('暂不支持此设备！', {centered: true});
            } else {
                //@ts-ignore
                navigator.requestMIDIAccess().then((midi: any) => {
                    this.midi = midi;
                    this.midiIn = this.midi.inputs.values().next().value;
                    this.midiOut = this.midi.outputs.values().next().value;
                });
            }
        }

        playOut(note: []) {
            if (this.midiOut) {
                this.midiOut.send(note)
            } else {
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
