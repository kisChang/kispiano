<template>
    <div class="text-center" style="margin-top: 10%;">
        <img src="../assets/logo.png">
        <div>V{{version}}</div>
        <div><small>官网：<a href="http://piano.kischang.top/" target="_blank">http://piano.kischang.top/</a></small></div>
        <div><small>开源地址：<a href="https://github.com/kisChang/" target="_blank">https://github.com/kisChang/</a></small></div>
        <div style="padding: 0 10%;"><small>个人制作工具软件，服务端全部依赖用 ❤ 发电，不保证服务质量。</small></div>
        <div style="display: none;">
            <div><small>赏个茶叶钱：</small></div>
            <div class="container">
                <div class="row">
                    <div class="card col-6">
                        <img src="../assets/alipay.png" class="card-img-top" alt="Alipay">
                        <div class="card-body">
                            <p class="card-text">Alipay</p>
                        </div>
                    </div>
                    <div class="card col-6">
                        <img src="../assets/wechat.png" class="card-img-top" alt="Wechat">
                        <div class="card-body">
                            <p class="card-text">Wechat</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <cusFooter style="margin-top: 2rem;" />
    </div>
</template>

<script>
    import Footer from "@/components/base/Footer";
    // @ts-ignore
    import config from '@/../package.json'

    export default {
        name: 'About',
        components: {cusFooter: Footer},
        data(){
            return {
                version: config.version,
            };
        }
    }
</script>