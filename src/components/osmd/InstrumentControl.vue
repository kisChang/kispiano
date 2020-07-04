<template>
    <div style="border: 1px solid #DDD;padding: 5px;margin-top: 5px;">
        <h5>{{ instrument.Name }}</h5>
        <div v-for="(voice, index) in instrument.Voices" :key="index">
            <span>{{ voice.Name }}</span>
            <b-form-select
                    class="mb-1"
                    :value="playbackEngine.getPlaybackInstrument(voice.VoiceId).midiId"
                    :options="instruments"
                    @change="midiInstrumentId => setPlaybackInstrument(voice, midiInstrumentId)"
            ></b-form-select>
            <VolumeSlider :volume.sync="voice.Volume"/>
        </div>
    </div>
</template>

<script>
    import VolumeSlider from "./VolumeSlider.vue";

    export default {
        components: {
            VolumeSlider
        },
        props: ["instrument", "playbackEngine"],
        computed: {
            instruments() {
                if (!this.playbackEngine.availableInstruments) return [];
                return this.playbackEngine.availableInstruments.map(i => ({
                    text: i.name,
                    value: i.midiId
                }));
            }
        },
        methods: {
            setPlaybackInstrument(voiceId, midiInstrumentId) {
                this.playbackEngine.setInstrument(voiceId, midiInstrumentId);
            }
        }
    };
</script>
