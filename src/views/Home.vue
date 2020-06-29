<template>
    <div>
        <div class="app-content">
            <div style="text-align: center;">
                <HelloWorld/>
                <HelloWorld/>
                <HelloWorld/>
                <HelloWorld/>
                <HelloWorld/>
                <HelloWorld/>
                <HelloWorld/>
                <HelloWorld/>
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
                        <b-list-group-item replace to="/">
                            Home
                        </b-list-group-item>
                        <b-list-group-item replace to="/about">
                            About
                        </b-list-group-item>
                        <b-list-group-item replace to="/test/piano">
                            Piano
                        </b-list-group-item>
                        <b-list-group-item replace to="/test/midi">
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
    import HelloWorld from '@/components/HelloWorld.vue'

    //应用首页
    export default {
        name: 'Home',
        components: {
            HelloWorld
        },
        data: () => ({
            sheetLeftViews: false,
            sheetRightUser: false,
            drawer: null,
        }),
        mounted() {
            console.log("OK")
        },
        methods: {
            showUserPlus() {
                this.$bvModal.msgBoxOk('开发中，敬请期待！', {centered: true});
            },
        }
    }
</script>

<style scoped>
    .app-content {
        z-index: 1900;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 35px;
        overflow: auto;
    }

    .bottom-navigation {
        z-index: 2000;
        position: fixed;
        right: 0;
        bottom: 0;
        left: 0;
        height: 35px;
        box-shadow: 0 2px 4px -1px rgba(0, 0, 0, .2), 0 4px 5px 0 rgba(0, 0, 0, .14), 0 1px 10px 0 rgba(0, 0, 0, .12);
    }

    .bottom-navigation .bottom-navigation-btn {
        position: absolute;
        height: 35px;
        border: 0;
        width: 55px;
    }

    .bottom-navigation .bmn-btn-center {
        position: absolute;
        bottom: 5px;
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
    }

    .bottom-sheet .bottom-sheet-hide {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        z-index: 2010;
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
        z-index: 2011;
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
