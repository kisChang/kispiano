<template>
    <div>
        <b-form-input type="range" min="0" max="200" step="1" :disabled="disabled" v-model="tmpVal"
                      @input="val => this.$emit('update:bpm', Number(val))">
        </b-form-input>
        <small style="display: block;text-align: center;">{{tmpVal}}</small>
    </div>
</template>

<script>
    export default {
        props: ["bpm", "disabled"],
        data(){
            return {
                tmpVal: 0,
            }
        },
        mounted() {
            this.tmpVal = this.$props.bpm;
        }
    };
</script>
