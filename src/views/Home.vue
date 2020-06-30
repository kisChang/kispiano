<template>
    <div>
        <div class="app-content">
            <div class="input-group input-group-sm mb-1">
                <form @submit="submitSearch()" style="width: 100%;">
                    <input v-model="searchText" type="text" class="form-control" placeholder="请输入关键词">
                </form>
            </div>

            <div style="text-align: center;">
                <div class="card mb-2" v-for="(item) in musicxmlList" :key="item.id" @click="toShowMusic(item)">
                    <div class="row no-gutters">
                        <div class="col-4 p-1">
                            <img src="../assets/logo.png" style="width: 80px;left: 15px;" class="card-img align-middle-pos">
                        </div>
                        <div class="col-8">
                            <div class="card-body text-left p-2">
                                <h5 class="card-title">{{item.name}}</h5>
                                <p class="card-text text-right"><small class="text-muted">{{item.lastUpdate}}</small></p>
                            </div>
                        </div>
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
                        <b-list-group-item to="/">
                            Home
                        </b-list-group-item>
                        <b-list-group-item to="/test/piano">
                            Piano
                        </b-list-group-item>
                        <b-list-group-item to="/test/midi">
                            Midi
                        </b-list-group-item>
                    </b-list-group>
                </div>
            </div>
        </transition>
        <transition name="slide-fade">
            <div class="bottom-sheet" v-show="sheetRightUser">
                <div class="bottom-sheet-hide" @click="sheetRightUser = false"></div>
                <div class="bottom-sheet-content">
                    用户个人中心
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    //应用首页
    export default {
        name: 'Home',
        components: {},
        data: () => ({
            /*数据和检索*/
            searchText: '',

            musicxmlList: [
                /*{id: 1, name: 'An Chloe, K. 524', savePath: '/musicxml/1.xml', lastUpdate: '2020-06-30 10:00:00'},*/
                {id: 2, name: 'An die ferne Geliebte, Op. 98', savePath: '/musicxml/2.xml', lastUpdate: '2020-06-30 10:00:00'},
                {id: 3, name: 'Ave Maria D.839', savePath: '/musicxml/3.xml', lastUpdate: '2020-06-30 10:00:00'},
                {id: 4, name: 'Beethoven_AnDieFerneGeliebte', savePath: '/musicxml/4.xml', lastUpdate: '2020-06-30 10:00:00'},
                {id: 5, name: 'Das Veilchen, K. 476', savePath: '/musicxml/5.xml', lastUpdate: '2020-06-30 10:00:00'},
                {id: 6, name: 'Dichterliebe, Op. 48', savePath: '/musicxml/6.xmll', lastUpdate: '2020-06-30 10:00:00'},
                {id: 7, name: 'MuzioClementi_SonatinaOpus36No1_Part1', savePath: '/musicxml/7.xml', lastUpdate: '2020-06-30 10:00:00'},
                {id: 8, name: 'MuzioClementi_SonatinaOpus36No1_Part2', savePath: '/musicxml/8.xml', lastUpdate: '2020-06-30 10:00:00'},
                {id: 9, name: 'MuzioClementi_SonatinaOpus36No3_Part1', savePath: '/musicxml/9.xml', lastUpdate: '2020-06-30 10:00:00'},
                {id: 10, name: 'MuzioClementi_SonatinaOpus36No3_Part2', savePath: '/musicxml/10.xml', lastUpdate: '2020-06-30 10:00:00'},
                {id: 11, name: 'ScottJoplin_EliteSyncopations', savePath: '/musicxml/11.xml', lastUpdate: '2020-06-30 10:00:00'},
                {id: 12, name: 'ScottJoplin_The_Entertainer', savePath: '/musicxml/12.xml', lastUpdate: '2020-06-30 10:00:00'},
                {id: 13, name: 'Wie Melodien zieht es mir, Op. 105, No. 1', savePath: '/musicxml/13.xml', lastUpdate: '2020-06-30 10:00:00'},
            ],

            /*应用功能*/
            sheetLeftViews: false, sheetRightUser: false,
        }),
        mounted() {
            console.log("OK")
        },
        methods: {
            submitSearch(){
                console.log('searchText >>>' + this.searchText);
            },
            toShowMusic(musicXml){
                this.$router.push(`/musicxml/view?id=${musicXml.id}`)
            },

            showUserPlus() {
                this.$bvModal.msgBoxOk('开发中，敬请期待！', {centered: true});
            },
        }
    }
</script>

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
        bottom: 10px;
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
