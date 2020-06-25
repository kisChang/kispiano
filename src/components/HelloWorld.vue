<template>
    <div>
        <h3>Keep it Simple</h3>
        <piano-keyboard />
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import PianoKeyboard from '@/components/PianoKeyboard.vue';

    @Component({
        components: {PianoKeyboard}
    })
    export default class HelloWorld extends Vue {
        mounted(): void {
            console.log("123")
        }
    }
</script>

<style scoped>

</style>
