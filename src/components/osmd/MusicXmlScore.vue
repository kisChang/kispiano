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
    import Aesdb from "../../utils/aesdb";
    import zlib from 'zlib';

    export default {
        props: ["score", "ready"],
        data() {
            const datetime = new Date().getTime();
            return {
                datetime: datetime,
                osmd: null,
                scoreLoading: false,
                horizontalScreen: false,
            };
        },
        watch: {
            score(val, oldVal) {
                if (!val || val === oldVal) return;
                this.loadScore(val);
            }
        },
        async mounted() {
            //加载osmd
            this.checkHorizontalScreen();
            this.osmd = new OpenSheetMusicDisplay(this.$refs.scorediv, {
                backend: 'svg', followCursor: true, autoResize: false,
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
                    this.getDbStore().then(dbStore => {
                        const request = dbStore.index('urlPath').get(key);
                        request.onerror = function () {
                            resolve(null);
                        };
                        request.onsuccess = function (event) {
                            if (event.target.result) {
                                resolve(Buffer.from(event.target.result.value, 'base64'));
                            }else {
                                resolve(null);
                            }
                        };
                    });
                })
            },
            setCacheData(key, value) {
                return new Promise(resolve => {
                    this.getDbStore().then(dbStore => {
                        const request = dbStore.add({
                            urlPath: key, value: value
                        });
                        request.onerror = function () {
                            resolve();
                        };
                        request.onsuccess = function () {
                            resolve();
                        };
                    });
                })
            },
            getDbStore() {
                return Aesdb.getObjectStore('cache_xml');
            },

            async loadScore(scoreUrl, retry) {
                this.scoreLoading = true;
                //0. 检查缓存
                let cacheData = await this.getCacheData(scoreUrl);
                if (cacheData) { // 命中缓存
                    // 缓存的是byte data
                    // 解密
                    cacheData = Aesdb.decrypt(cacheData);
                    // 转回
                    cacheData = cacheData.toString('utf-8');
                } else { // 未缓存
                    //1. 下载数据
                    const urlRv = await axios.get(scoreUrl + `?date=${this.datetime}`);
                    //2. 解压
                    const unGzData = zlib.gunzipSync(Buffer.from(urlRv.data, 'base64'));
                    //3. 存入本地缓存库(按base64编码存储)
                    await this.setCacheData(scoreUrl, unGzData.toString('base64'));

                    if (retry){
                        // 被重载了，可能是缓存的问题
                        cacheData = Aesdb.decrypt(unGzData);// 解密
                        cacheData = cacheData.toString('utf-8');// 转回
                    }else {
                        //第一次运行
                        //4. 重载
                        await this.loadScore(scoreUrl, true);
                        return;
                    }
                }
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
