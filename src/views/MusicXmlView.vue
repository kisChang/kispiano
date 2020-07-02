<template>
    <div class="about">
        <musicxml-view v-show="showView" ref="xmlView"></musicxml-view>
        <div v-show="!showView">{{showMsg}}</div>
    </div>
</template>

<script>
    import MusicXmlDisplay from "@/components/MusicXmlDisplay.vue";

    export default {
        name: "tabbar-viewXml",
        components: {'musicxml-view': MusicXmlDisplay},
        data(){
            return {
                showView: false,
                showMsg: '正在加载！',
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
                    this.showView = true;
                    this.showMsg = "加载成功！";
                    this.$refs.xmlView.loadMusicXML(xhttp.responseXML)
                }else {
                    this.showView = false;
                    this.showMsg = "加载失败...";
                }
            };
            xhttp.open("GET", url, true);
            xhttp.send();
        },
    }
</script>

<style scoped>

</style>