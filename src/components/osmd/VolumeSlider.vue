<template>
    <div>
        <b-form-input type="range" min="0" max="2" step="0.05" v-model="tmpVal"
                      @input="val => this.$emit('update:volume', Number(val))"></b-form-input>
        <small style="display: block;text-align: center;">{{tmpVal}}</small>
    </div>
</template>

<script>
    export default {
        props: ["volume"],
        data(){
            return {
                tmpVal: 0,
            }
        },
        mounted() {
            this.tmpVal = this.$props.volume;
        }
    };
</script>
