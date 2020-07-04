<template>
    <div>
        <musicxml-view ref="xmlView"></musicxml-view>
    </div>
</template>

<script>
    import MusicXmlDisplay from "@/components/MusicXmlDisplay.vue";

    export default {
        name: "tabbar-viewXml",
        components: {'musicxml-view': MusicXmlDisplay},
        data(){
            return {
                asd: 1
            }
        },
        mounted() {
            let url;
            if (this.$route.query.id){
                url = `/musicxml/${this.$route.query.id}.xml`
            }else {
                url = this.$route.query.url;
            }
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