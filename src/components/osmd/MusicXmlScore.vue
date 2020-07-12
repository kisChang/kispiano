<template>
    <div>
        <div class="score-progress" v-if="scoreLoading || !ready">
            <div class="spinner spinner-grow text-primary" role="status" style="margin-top: 20%;">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
        <div class="score" ref="scorediv" v-show="!scoreLoading" :style="{opacity: ready ? 100 : 0}"></div>
    </div>
</template>

<script>
    import axios from "axios";
    import {OpenSheetMusicDisplay} from "opensheetmusicdisplay";
    import {aesdb} from "../../utils/aesdb";
    import zlib from 'zlib';

    export default {
        props: ["score", "ready"],
        data() {
            return {
                osmd: null,
                scoreLoading: false,
                horizontalScreen: false,
                dbStore: null,
                map: {},
            };
        },
        watch: {
            score(val, oldVal) {
                if (!val || val === oldVal) return;
                this.loadScore(val);
            }
        },
        async mounted() {
            //加载缓存
            aesdb.getTransaction().then(value => {
                this.dbStore = value.objectStore('cache_xml');
            });
            //加载osmd
            this.osmd = new OpenSheetMusicDisplay(this.$refs.scorediv, {
                followCursor: true, autoResize: false,
                backend: 'svg',
                // backend: "canvas",
                drawTitle: false, drawSubtitle: false,
            });
            //// me
            this.osmd.zoom = this.horizontalScreen ? 0.5 : 0.4;
            ////
            this.$emit("osmdInit", this.osmd);
            if (this.score) this.loadScore(this.score);
        },
        methods: {
            getCacheData(key) {
                return new Promise((resolve) => {
                    /*const request = this.dbStore.get(key);
                    request.onerror = function() {
                        resolve(null);
                    };
                    request.onsuccess = function(event) {
                        resolve(event.target.result.name);
                    };*/

                    resolve(this.map[key]);
                })
            },
            setCacheData(key, value) {
                // this.dbStore.add({
                //     key: key, value: value
                // })
                this.map[key] =value;
            },

            async loadScore(scoreUrl) {
                this.scoreLoading = true;
                //0. 检查缓存
                let cacheData = await this.getCacheData(scoreUrl);
                if (cacheData) { // 命中缓存
                    // 缓存的是base64
                    cacheData = Buffer.from(cacheData, 'base64');
                    // 解密
                    cacheData = aesdb.decrypt(cacheData, aesdb.aes_key);
                } else { // 未缓存
                    //1. 下载数据
                    const urlRv = await axios.get(scoreUrl);
                    //2. 解压
                    const unGzData = zlib.gunzipSync(Buffer.from(urlRv.data, 'base64'));
                    //3. 存入本地缓存库(按base64编码存储)
                    this.setCacheData(scoreUrl, unGzData.toString('base64'));
                    //4. 重载
                    await this.loadScore(scoreUrl);
                    return;
                }
                console.log('cacheData')
                console.log(cacheData)
                // 开始加载
                await this.osmd.load(cacheData);
                this.scoreLoading = false;
                await this.$nextTick();
                //// my Code
                this.osmd.zoom = this.horizontalScreen ? 0.5 : 0.4;
                //// my Code End
                await this.osmd.render();
                this.$emit("scoreLoaded");
            },

            checkHorizontalScreen() {
                if (window.orientation == 180 || window.orientation == 0) {
                    this.horizontalScreen = false;
                }
                if (window.orientation == 90 || window.orientation == -90) {
                    this.horizontalScreen = true;
                }
            }
        }
    };
</script>

<style scoped lang="scss">
    .score {
        width: 100%;
        -webkit-box-shadow: 0px 4px 5px 0px rgba(0, 0, 0, 0.4);
        -moz-box-shadow: 0px 4px 5px 0px rgba(0, 0, 0, 0.4);
        box-shadow: 0px 4px 5px 0px rgba(0, 0, 0, 0.4);
    }

    .score-progress {
        text-align: center;
    }
</style>

<style lang="scss">
    .score {
        img {
            z-index: 1 !important;
        }
    }
</style>
