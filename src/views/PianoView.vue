<template>
    <div>
        <piano-keyboard/>
    </div>
</template>

<script>
    import PianoKeyboard from '@/components/PianoKeyboard.vue';

    export default {
        name: "PianoView",
        components: {PianoKeyboard},

        mounted() {
            console.log("123")
        }
    }
</script>

<style scoped>

</style>