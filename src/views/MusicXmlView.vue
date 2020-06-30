<template>
    <div class="about">
        <musicxml-view ref="xmlView"></musicxml-view>
    </div>
</template>

<script>
    import MusicXmlDisplay from "@/components/MusicXmlDisplay.vue";

    export default {
        name: "tabbar-viewXml",
        components: {'musicxml-view': MusicXmlDisplay},
        mounted() {
            const url = `/musicxml/${this.$route.query.id}.xml`;
            console.log('option.url >>>' + url);

            const xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = () => {
                if (xhttp.readyState === 4) {
                    this.$refs.xmlView.loadMusicXML(xhttp.responseXML)
                }
            };
            xhttp.open("GET", url, true);
            xhttp.send();
        },
    }
</script>

<style scoped>

</style>