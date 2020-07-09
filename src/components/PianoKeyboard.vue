<template>
    <div>
        <div class="text-center">
            <b-form-group label="请选择播放输出设备">
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
                <div class="bkey-wrap">
                    <div class="bkey-fill-first">
                        <div class="bkey bkey-first" v-for="note in noteBlack0" :key="note.name" :data-keyCode="note.name"
                             @mousedown="clickPianoKey($event, note.name)" @mouseup="unClickPianoKey(note.name)"></div>
                    </div>
                    <div class="bkey-fill">
                        <div class="bkey" v-for="note in noteBlack1" :key="note.name" :data-keyCode="note.name"
                             @mousedown="clickPianoKey($event, note.name)" @mouseup="unClickPianoKey(note.name)"></div>
                    </div>
                    <div class="bkey-fill">
                        <div class="bkey" v-for="note in noteBlack2" :key="note.name" :data-keyCode="note.name"
                             @mousedown="clickPianoKey($event, note.name)" @mouseup="unClickPianoKey(note.name)"></div>
                    </div>
                    <div class="bkey-fill">
                        <div class="bkey" v-for="note in noteBlack3" :key="note.name" :data-keyCode="note.name"
                             @mousedown="clickPianoKey($event, note.name)" @mouseup="unClickPianoKey(note.name)"></div>
                    </div>
                    <div class="bkey-fill">
                        <div class="bkey" v-for="note in noteBlack4" :key="note.name" :data-keyCode="note.name"
                             @mousedown="clickPianoKey($event, note.name)" @mouseup="unClickPianoKey(note.name)"></div>
                    </div>
                    <div class="bkey-fill">
                        <div class="bkey" v-for="note in noteBlack5" :key="note.name" :data-keyCode="note.name"
                             @mousedown="clickPianoKey($event, note.name)" @mouseup="unClickPianoKey(note.name)"></div>
                    </div>
                    <div class="bkey-fill">
                        <div class="bkey" v-for="note in noteBlack6" :key="note.name" :data-keyCode="note.name"
                             @mousedown="clickPianoKey($event, note.name)" @mouseup="unClickPianoKey(note.name)"></div>
                    </div>
                    <div class="bkey-fill">
                        <div class="bkey" v-for="note in noteBlack7" :key="note.name" :data-keyCode="note.name"
                             @mousedown="clickPianoKey($event, note.name)" @mouseup="unClickPianoKey(note.name)"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Notes, {NotesCode} from '@/config/Notes';
    import Soundfont from "soundfont-player";
    import {MidiUsb} from "@/utils/MidiUsb";

    export default {
        name: "PianoKeyboard",
        data() {
            return {
                Notes: Notes,
                synth: null,    //合成器
                clavinet: null,

                usingType: true, //播放音频方式
            };
        },
        computed: {
            noteWhite: function () {
                return this.Notes.filter(n => {
                    return n.type === true
                });
            },
            noteBlack0: function () {
                return this.Notes.filter(note => { return note.type === false && note.id >= 21 && note.id <= 23 });
            },
            noteBlack1: function () {
                return this.Notes.filter(note => { return note.type === false && note.id >= 23 && note.id <= 35 });
            },
            noteBlack2: function () {
                return this.Notes.filter(note => { return note.type === false && note.id >= 36 && note.id <= 47 });
            },
            noteBlack3: function () {
                return this.Notes.filter(note => { return note.type === false && note.id >= 48 && note.id <= 59 });
            },
            noteBlack4: function () {
                return this.Notes.filter(note => { return note.type === false && note.id >= 60 && note.id <= 71 });
            },
            noteBlack5: function () {
                return this.Notes.filter(note => { return note.type === false && note.id >= 72 && note.id <= 83 });
            },
            noteBlack6: function () {
                return this.Notes.filter(note => { return note.type === false && note.id >= 84 && note.id <= 95 });
            },
            noteBlack7: function () {
                return this.Notes.filter(note => { return note.type === false && note.id >= 96 && note.id <= 108 });
            },
        },
        mounted() {
            // Tone. js 初始化合成器
            // this.synth = new Tone.Sampler(NotesMp3, {"release" : 1, "baseUrl" : "/piano/"}).toMaster();

            Soundfont.instrument(new AudioContext(), 'acoustic_grand_piano').then((clavinet)=> {
                this.clavinet = clavinet;
                console.log('this.clavinet >>>' + this.clavinet)
            }).catch(error => {
                console.log('this.clavinet >>> error>> ' + error);
            });

            //初始化MiDi控制
            MidiUsb.init().then().catch(reason => {
                this.$bvModal.msgBoxOk(reason, {centered: true});
            });
        },
        methods: {
            clickPianoKey(event, keyCode) {
                this.playNote(keyCode);
            },
            playNote(notename = 'C4') {
                if (this.usingType){//内部发声
                    // 合成器触发音频释放
                    this.clavinet.play(notename);
                }else {
                    //通过midi
                    MidiUsb.midiOutOn(NotesCode[notename], 0x7f);
                }
            },
            unClickPianoKey(notename) {
                MidiUsb.midiOutOff(NotesCode[notename], 0x7f);
            },
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
                width: 100%;
                height: 0;
                position: absolute;
                top: 0;
                display: block;

                .bkey-fill-first{
                    float: left;
                    width: 3.7%;
                }
                .bkey-fill{
                    float: left;
                    width: 13.5%;
                    border: 0;
                    margin: 0;
                    padding: 0;
                }
            }

            .bkey-first{
                position: absolute;
                display: block !important;
                width: 50% !important;
                left: 30% !important;
            }

            .bkey {
                display: inline-block;
                width: 12.5%;
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
                left: 8%;
            }

            .bkey:nth-child(2) {
                left: 10%;
            }

            .bkey:nth-child(3) {
                left: 25%;
            }

            .bkey:nth-child(4) {
                left: 27%;
            }

            .bkey:nth-child(5) {
                left: 29.5%;
            }
        }
    }
</style>