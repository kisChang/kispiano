<template>
    <!--<div id="piano-keys" @contextmenu.prevent>
        <div v-for="note in Notes" v-if="note.type == true || note.type == false"
             :data-note="note.name" class="key natural"
             v-bind:class="{ hover: note.hover}"
             @touchstart="clickPianoKey($event, note)" @touchend="stopPianoKey($event, note)">
            <div v-if="note.type === true" class="key sharp"
                 @touchstart="clickPianoKey($event, note)" @touchend="stopPianoKey($event, note)"></div>
        </div>
    </div>-->
    <div class="piano-wrap">
        <div class="piano-key-wrap">
            <div class="piano-key wkey" v-for="note in noteWhite" :key="note.name" :data-keyCode="note.name"
                 @mousedown="clickPianoKey($event, note.name)"></div>
            <div class="bkey-wrap bkey-wrap1">
                <div class="piano-key bkey" v-for="note in noteBlack1" :key="note.name" :data-keyCode="note.name"
                     @mousedown="clickPianoKey($event, note.name)"></div>
            </div>
            <div class="bkey-wrap bkey-wrap2">
                <div class="piano-key bkey" v-for="note in noteBlack2" :key="note.name" :data-keyCode="note.name"
                     @mousedown="clickPianoKey($event, note.name)"></div>
            </div>
            <div class="bkey-wrap bkey-wrap3">
                <div class="piano-key bkey" v-for="note in noteBlack3" :key="note.name" :data-keyCode="note.name"
                     @mousedown="clickPianoKey($event, note.name)"></div>
            </div>
            <div class="bkey-wrap bkey-wrap4">
                <div class="piano-key bkey" v-for="note in noteBlack4" :key="note.name" :data-keyCode="note.name"
                     @mousedown="clickPianoKey($event, note.name)"></div>
            </div>
            <div class="bkey-wrap bkey-wrap5">
                <div class="piano-key bkey" v-for="note in noteBlack5" :key="note.name" :data-keyCode="note.name"
                     @mousedown="clickPianoKey($event, note.name)"></div>
            </div>

        </div>
    </div>
</template>

<script>
    import Notes, {NotesMp3} from '@/config/Notes';
    import Tone from 'tone';

    export default {
        name: "PianoKeyboard",
        data() {
            return {
                Notes: Notes,
                synth: null,    //合成器
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
            // 初始化合成器
            this.synth = new Tone.Sampler(NotesMp3, {
                "release" : 1,
                "baseUrl" : "/piano/"
            }).toMaster();
            // this.synth = new Tone.Synth().toMaster()
        },
        methods: {
            clickPianoKey(event, keyCode) {
                this.playNote(keyCode, '2n');
            },
            // 合成器触发音频释放
            playNote(notename = 'C4', duration = '2n') {
                if (!this.synth) return;
                this.synth.triggerAttackRelease(notename, duration);
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

            .wkey {
                display: inline-block;
                width: 2.775%;
                height: 100%;
                margin: 0 auto;
                background: linear-gradient(white 10%, rgb(251, 251, 251) 92%, rgb(220, 220, 220) 93%, white 97%);
                border: solid 1px @dark;
                border-radius: 0 0 5px 5px;
                position: relative;

                &:active {
                    background: linear-gradient(#eee 10%, #ddd 60%, #bbb 93%, #ccc 97%);
                }
            }

            .wkey-active {
                background: linear-gradient(#eee 10%, #ddd 60%, #bbb 93%, #ccc 97%);
            }

            .bkey-wrap {
                width: 20%;
                height: 0;
                position: absolute;
                top: 0;
            }

            .bkey-wrap1 {
                left: 18px;
            }

            .bkey-wrap2 {
                left: 18.5%;
            }

            .bkey-wrap3 {
                left: 38.5%;
            }

            .bkey-wrap4 {
                left: 58.7%;
            }

            .bkey-wrap5 {
                left: 79%;
            }

            .bkey {
                display: inline-block;
                width: 10%;
                height: 100px;
                background: linear-gradient(#000 10%, rgb(86, 86, 86) 85%, #000 90%);
                border-radius: 0 0 3px 3px;
                position: absolute;
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
                left: 23%;
            }

            .bkey:nth-child(3) {
                left: 52%;
            }

            .bkey:nth-child(4) {
                left: 67%;
            }

            .bkey:nth-child(5) {
                left: 81%;
            }
        }
    }
</style>