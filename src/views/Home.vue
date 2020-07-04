<template>
    <div>
        <div class="app-content">
            <div class="input-group input-group-sm">
                <form action="" @submit.prevent="submitSearch()" style="width: 100%;">
                    <input v-model="searchText" type="text" class="form-control" placeholder="请输入关键词">
                </form>
            </div>

            <div class="music-card-list">
                <div class="card-list-title row">
                    <span class="col-7">钢琴谱列表：</span>
                    <b-link class="showall col-5 text-right" to="/list/musicxml">查看更多>></b-link>
                </div>
                <div class="music-card " v-for="(item) in musicxmlList" :key="item.id" @click="toShowMusic(item)">
                    <img :src="'/static/pic/' + item.mainPic" class="card-img">
                    <div class="card-body text-left p-2">
                        <div class="card-title">{{item.name}}</div>
                        <p class="card-text text-right"><small class="text-muted">{{item.lastUpdate}}</small></p>
                    </div>
                </div>
            </div>

            <div class="music-card-list" style="margin-top: 15px;">
                <div class="card-list-title row">
                    <span class="col-7">合集列表：</span>
                    <b-link class="showall col-5 text-right" to="/list/xmlset">查看更多>></b-link>
                </div>
                <div style="overflow-y: auto;padding: 5px 0;">
                    <div class="music-set-list">
                        <b-card v-for="(item) in xmlsetList" :key="item.id"
                                :img-src="'/static/pic/' + item.mainPic"
                                @click="toRouter('/list/xmlset/' + item.id + '/view')"
                                img-top class="music-set">
                            <b-card-text>{{item.name}}</b-card-text>
                        </b-card>
                    </div>
                </div>
            </div>
        </div>

        <div class="bottom-navigation">
            <div @click="sheetLeftViews = !sheetLeftViews" style="left:0;" class="bottom-navigation-btn btn btn-dark">
                <b-icon-card-list></b-icon-card-list>
            </div>
            <button @click="showUserPlus()" type="button" class="btn bmn-btn-center bmd-btn-fab">
                <b-icon-plus></b-icon-plus>
            </button>
            <div @click="sheetRightUser = !sheetRightUser" style="right:0;" class="bottom-navigation-btn btn btn-dark">
                <b-icon-person-lines-fill></b-icon-person-lines-fill>
            </div>
        </div>
        <transition name="slide-fade">
            <div class="bottom-sheet" v-show="sheetLeftViews">
                <div class="bottom-sheet-hide" @click="sheetLeftViews = false"></div>
                <div class="bottom-sheet-content">
                    <b-list-group>
                        <b-list-group-item to="/test/piano">
                            键盘测试页
                        </b-list-group-item>
                        <b-list-group-item to="/test/midi">
                            Midi键盘测试页
                        </b-list-group-item>
                    </b-list-group>
                </div>
            </div>
        </transition>
        <transition name="slide-fade">
            <div class="bottom-sheet" v-show="sheetRightUser">
                <div class="bottom-sheet-hide" @click="sheetRightUser = false"></div>
                <div class="bottom-sheet-content">
                    <b-list-group>
                        <b-list-group-item @click="showUserProfile()">
                            个人中心
                        </b-list-group-item>
                        <b-list-group-item to="/about">
                            关于我们
                        </b-list-group-item>
                    </b-list-group>
                    <cusFooter />
                </div>
            </div>
        </transition>

        <div class="loading-spinner" v-show="loading">
            <div class="spinner spinner-grow text-primary" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
    </div>
</template>

<script>
    import {musicxmlAllByName, xmlSetAllByName} from "@/api/musicxml";
    import Footer from "@/components/base/Footer";

    //应用首页
    export default {
        name: 'Home',
        components: {cusFooter: Footer},
        data: () => ({
            loading: true,
            /*数据和检索*/
            pageNow: 0, searchText: '',
            musicxmlList: [],
            xmlsetList: [],

            /*应用功能*/
            sheetLeftViews: false, sheetRightUser: false,
        }),
        mounted() {
            // console.log("OK")
            //加载琴谱列表
            this.submitSearch();
            //加载合集列表
            this.loadHotSet();

            //提示
            // this.$bvToast.toast('提示消息', {
            //     toaster: 'b-toaster-bottom-center', bodyClass: 'text-center',
            //     solid: true, appendToast: true, headerClass: 'hide',
            // });
        },
        beforeDestroy(){
            console.log("OK")
        },
        methods: {
            submitSearch(){
                musicxmlAllByName({page: this.pageNow, pageSize: 6, name: this.searchText}).then((resp) => {
                    this.musicxmlList = resp.data.content;
                    this.loading = false;
                }).catch(_reason => {
                    this.loading = false;
                });
                return false;
            },
            loadHotSet(){
                xmlSetAllByName({page: 0, name: null}).then((resp) => {
                    this.xmlsetList = resp.data.content;
                });
            },

            toShowMusic(musicXml){
                this.$router.push(`/musicxml/view?url=/static/xml/${musicXml.savePath}`)
            },

            showUserPlus() {
                this.$bvModal.msgBoxOk('开发中，敬请期待！', {centered: true});
            },
            showUserProfile() {
                this.$bvModal.msgBoxOk('开发中，敬请期待！', {centered: true});
            },

            toRouter(path){
                this.$router.push(path);
            }
        }
    }
</script>

<style>
    .music-set-list{
        display: flex;
        /*width: 1000px;*/
    }
    .music-set-list .music-set{
        padding: 0 5px;
        margin: 0 10px;
    }
    .music-set-list .music-set img{
        width: 100px;
        height: 150px;
        padding-top: 5px;
    }
    .music-set-list .music-set .card-body{
        padding: 5px;
        text-align: center;
    }

    .hide{
        display: none !important;
    }
    .music-card-list {
        background: #FFF;
    }
    .music-card-list .card-list-title{
        border-bottom: 1px solid #DDD;
        margin: 5px 0;
    }
    .music-card-list .card-list-title .showall{
        font-size: 0.9rem;
        margin-top: 2px;
        color: #b3b3b3;
    }

    .music-card{
        position: relative;
        margin: 5px 0;
        padding: 5px 5px 10px;
        background: #FFF;
        border-bottom: 1px solid #DDD;
    }
    .music-card:last-child{
        border-bottom: none;
    }
    .music-card .card-img{
        width: 80px;
        height: 80px;
    }
    .music-card .card-body{
        position: absolute;
        top: 0;
        left: 85px;
        right: 0;
    }

    .loading-spinner{
        height: 100%;
        text-align: center;
        z-index: 99999;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: #ffffff5e;
    }
    .loading-spinner .spinner{
        width: 5rem;
        height: 5rem;
        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%);
    }
</style>

<style scoped lang="less">
    @import url('../assets/style/variable.less');

    .align-middle-pos{
        position: absolute;
        top: 50%;
        transform: translate(0, -50%);
    }

    .app-content {
        z-index: 19;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: @btm-height;
        overflow: auto;
        padding: 10px 10px 0;
    }

    .bottom-navigation {
        z-index: 20;
        position: fixed;
        right: 0;
        bottom: 0;
        left: 0;
        height: @btm-height;
        box-shadow: 0 2px 4px -1px rgba(0, 0, 0, .2), 0 4px 5px 0 rgba(0, 0, 0, .14), 0 1px 10px 0 rgba(0, 0, 0, .12);
    }

    .bottom-navigation .bottom-navigation-btn {
        position: absolute;
        height: @btm-height;
        border: 0;
        width: 70px;
        padding: 15px 10px;
    }
    .bottom-navigation-btn .b-icon{
        font-size: 180%;
    }

    .bottom-navigation .bmn-btn-center {
        position: absolute;
        bottom: 15px;
        left: 50%;
        background: #FFF;
        width: 3rem !important;
        min-width: 3rem !important;
        height: 3rem !important;
        margin-left: -1.5rem;
    }

    .bottom-sheet {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        z-index: 21;
    }

    .bottom-sheet .bottom-sheet-hide {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        z-index: 21;
        background: #ffffff9c;
    }

    .bottom-sheet .bottom-sheet-content {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        background: #FFF;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        box-shadow: 0 2px 4px -1px rgba(0, 0, 0, .2), 0 4px 5px 0 rgba(0, 0, 0, .14), 0 1px 10px 0 rgba(0, 0, 0, .12);
        padding: 10px;
        z-index: 22;
        min-height: 100px;
    }

    .slide-fade-enter-active {
        transition: all .3s ease;
    }

    .slide-fade-leave-active {
        transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }

    .slide-fade-enter, .slide-fade-leave-to {
        transform: translateY(10px);
        opacity: 0;
    }
</style>
