<template>
    <div>
        <div class="text-center">
            <b-form-group label="Inline switch style checkboxes">
                <b-form-checkbox v-model="usingType" class="switch" switch>
                    Using ({{usingType ? 'App Internal' : 'MiDi Keyboard'}})
                </b-form-checkbox>
            </b-form-group>
        </div>

        <div class="piano-wrap">
            <div class="piano-key-wrap">
                <div class="akey-wrap d-flex">
                    <div class="wkey flex-fill" v-for="note in noteWhite" :key="note.name" :data-keyCode="note.name"
                         @mousedown="clickPianoKey($event, note.name)" @mouseup="unClickPianoKey(note.name)"></div>
                </div>
                <div class="bkey-wrap d-flex">
                    <div class="bkey-wrap1 flex-fill">
                        <div class="bkey" v-for="note in noteBlack1" :key="note.name" :data-keyCode="note.name"
                             @mousedown="clickPianoKey($event, note.name)" @mouseup="unClickPianoKey(note.name)"></div>
                    </div>
                    <div class="bkey-wrap2 flex-fill">
                        <div class="bkey" v-for="note in noteBlack2" :key="note.name" :data-keyCode="note.name"
                             @mousedown="clickPianoKey($event, note.name)" @mouseup="unClickPianoKey(note.name)"></div>
                    </div>
                    <div class="bkey-wrap3 flex-fill">
                        <div class="bkey" v-for="note in noteBlack3" :key="note.name" :data-keyCode="note.name"
                             @mousedown="clickPianoKey($event, note.name)" @mouseup="unClickPianoKey(note.name)"></div>
                    </div>
                    <div class="bkey-wrap4 flex-fill">
                        <div class="bkey" v-for="note in noteBlack4" :key="note.name" :data-keyCode="note.name"
                             @mousedown="clickPianoKey($event, note.name)" @mouseup="unClickPianoKey(note.name)"></div>
                    </div>
                    <div class="bkey-wrap5 flex-fill">
                        <div class="bkey" v-for="note in noteBlack5" :key="note.name" :data-keyCode="note.name"
                             @mousedown="clickPianoKey($event, note.name)" @mouseup="unClickPianoKey(note.name)"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Notes, {NotesMp3, NotesCode} from '@/config/Notes';

    export default {
        name: "PianoKeyboard",
        data() {
            return {
                Notes: Notes,
                synth: null,    //合成器
                clavinet: null,

                midiIn: null,
                midiOut: null,

                usingType: true, //播放音频方式
            };
        },
        computed: {
            noteWhite: function () {
                return this.Notes.filter(n => {
                    return n.type === true
                });
            },
            noteBlack1: function () {
                return this.Notes.filter(note => { return note.type === false && note.id >= 36 && note.id <= 40 });
            },
            noteBlack2: function () {
                return this.Notes.filter(note => { return note.type === false && note.id >= 41 && note.id <= 45 });
            },
            noteBlack3: function () {
                return this.Notes.filter(note => { return note.type === false && note.id >= 46 && note.id <= 50 });
            },
            noteBlack4: function () {
                return this.Notes.filter(note => { return note.type === false && note.id >= 51 && note.id <= 55 });
            },
            noteBlack5: function () {
                return this.Notes.filter(note => { return note.type === false && note.id >= 56 && note.id <= 60 });
            },
        },
        mounted() {
            // Tone. js 初始化合成器
            // this.synth = new Tone.Sampler(NotesMp3, {"release" : 1, "baseUrl" : "/piano/"}).toMaster();

            // Soundfont.js
            // Soundfont.instrument(new AudioContext(), 'clavinet').then((clavinet)=> {
            //     this.clavinet = clavinet;
            //     console.log('this.clavinet >>>' + this.clavinet)
            // }).catch(error => {
            //     console.log('this.clavinet >>> error>> ' + error);
            // });

            //初始化MiDi控制
            if (!('requestMIDIAccess' in navigator)) {
                this.$bvModal.msgBoxOk('暂不支持此设备！', {centered: true});
            } else {
                //@ts-ignore
                navigator.requestMIDIAccess().then((midi) => {
                    this.midiIn = midi.inputs.values().next().value;
                    this.midiOut = midi.outputs.values().next().value;
                });
            }
        },
        methods: {
            clickPianoKey(event, keyCode) {
                this.playNote(keyCode, '2n');
            },
            playNote(notename = 'C4', duration = '2n') {
                if (this.usingType){//内部发生
                    // 合成器触发音频释放
                    // if (!this.synth) return;
                    // this.synth.triggerAttackRelease(notename, duration);

                    this.clavinet.play(notename);
                }else {
                    //通过midi
                    if (this.midiOut) {
                        this.midiOut.send([0x90, NotesCode[notename], 0x7f]);
                    } else {
                        this.addLog("this.midi Out is null");
                    }
                }
            },
            unClickPianoKey(notename) {
                if (this.midiOut) {
                    this.midiOut.send([0x80, NotesCode[notename], 0x7f]);
                } else {
                    this.addLog("this.midi Out is null");
                }
            },

            addLog(str){
                console.log(str);
            }
        },
    }
</script>

<style scoped lang="less">
    @import url('../assets/style/variable.less');

    .piano-wrap {
        width: 90%;
        margin: 0 auto;
        height: 150px;

        .piano-key-wrap {
            width: 100%;
            height: 100%;
            background: @dark;
            overflow: hidden;
            position: relative;

            .akey-wrap{
                height: 150px;
            }
            .wkey {
                display: inline-block;
                height: 100%;
                margin: 0 auto;
                background: linear-gradient(white 10%, rgb(251, 251, 251) 92%, rgb(220, 220, 220) 93%, white 97%);
                border: solid 1px @dark;
                position: relative;

                &:active {
                    background: linear-gradient(#eee 10%, #ddd 60%, #bbb 93%, #ccc 97%);
                }
            }

            .wkey-active {
                background: linear-gradient(#eee 10%, #ddd 60%, #bbb 93%, #ccc 97%);
            }

            .bkey-wrap {
                width: 98%;
                height: 0;
                position: absolute;
                top: 0;
            }

            .bkey {
                display: inline-block;
                width: 10%;
                height: 100px;
                background: linear-gradient(#000 10%, rgb(86, 86, 86) 85%, #000 90%);
                border-radius: 0 0 3px 3px;
                position: relative;
                top: 0;
                overflow: hidden;

                &:active {
                    background: linear-gradient(rgb(86, 86, 86) 10%, #000 90%, #222 100%);
                }
            }

            .bkey-active {
                background: linear-gradient(rgb(86, 86, 86) 10%, #000 90%, #222 100%);
            }

            .bkey:nth-child(1) {
                left: 9%;
            }

            .bkey:nth-child(2) {
                left: 12%;
            }

            .bkey:nth-child(3) {
                left: 30%;
            }

            .bkey:nth-child(4) {
                left: 34%;
            }

            .bkey:nth-child(5) {
                left: 38%;
            }
        }
    }
</style>