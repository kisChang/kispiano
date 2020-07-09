<template>
    <div>
        <div class="app-content">
            <div class="input-group input-group-sm">
                <form action="" @submit.prevent="submitSearch()" style="width: 100%;">
                    <input v-model="searchText" type="text" class="form-control" placeholder="请输入关键词">
                </form>
            </div>

            <div class="music-card-list">
                <div class="music-card " v-for="(item) in musicxmlList" :key="item.id" @click="toShowMusic(item)">
                    <img :src="'/static/pic/' + item.mainPic" class="card-img">
                    <div class="card-body text-left p-2">
                        <div class="card-title">{{item.name}}</div>
                        <p class="card-text text-right"><small class="text-muted">{{item.lastUpdate}}</small></p>
                    </div>
                </div>
            </div>
        </div>
        <div class="overflow-auto" style="position: fixed;bottom: 0;left: 0;right: 0;">
            <b-pagination-nav :number-of-pages="pageSize" :value="pageNow" v-model="pageNow"
                              to="/list/musicxml" replace
                              align="center" size="sm" pills></b-pagination-nav>
        </div>

        <div class="loading-spinner" v-show="loading">
            <div class="spinner spinner-grow text-primary" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
    </div>
</template>

<script>
    import {musicxmlAllByName} from "@/api/musicxml";
    //应用首页
    export default {
        name: 'MusicXmlListView',
        data: () => ({
            loading: true,
            /*数据和检索*/
            pageNow: 1,
            pageSize: 1,
            searchText: '',
            musicxmlList: [],
        }),
        mounted() {//加载琴谱列表
            this.submitSearch();
        },
        watch: {
            pageNow(nowVal){
                this.submitSearch();
            }
        },
        methods: {
            submitSearch(){
                musicxmlAllByName({page: (this.pageNow - 1), pageSize: 10, name: this.searchText}).then((resp) => {
                    this.musicxmlList = resp.data.content;
                    this.pageSize = resp.data.totalPages ? resp.data.totalPages : 0;
                    this.loading = false;
                }).catch(_reason => {
                    this.loading = false;
                });
                return false;
            },

            toShowMusic(musicXml){
                this.$router.push(`/musicxml/view?url=/static/xml/${musicXml.savePath}`)
            },

            toRouter(path){
                this.$router.push(path);
            }
        }
    }
</script>