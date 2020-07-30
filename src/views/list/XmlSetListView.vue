<template>
    <div>
        <div class="app-content" style="background: #FFF;">
            <b-list-group>
                <b-list-group-item v-for="(item) in musicxmlList" :key="item.id" @click="toShowMusic(item)"
                                   variant="success" style="border: 1px solid rgba(0,0,0,.125);">
                    {{item.name}}</b-list-group-item>
            </b-list-group>
        </div>
        <div class="overflow-auto" style="position: fixed;bottom: 0;left: 0;right: 0;">
            <b-pagination-nav :number-of-pages="pageSize" :value="pageNow" v-model="pageNow"
                              :to="'/list/xmlset/view?id=' + this.$route.query.id" replace
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
    import {xmlSetListById} from "@/api/musicxml";
    //应用首页
    export default {
        name: 'XmlSetListView',
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
                xmlSetListById({page: (this.pageNow - 1), pageSize: 15, name: this.$route.query.id}).then((resp) => {
                    this.musicxmlList = resp.data.content;
                    const tp = resp.data.totalPages ? resp.data.totalPages : 0;
                    this.pageSize = tp <= 0 ? 1 : tp;
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