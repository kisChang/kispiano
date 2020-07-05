<template>
    <div>
        <b-navbar variant="faded" type="light" style="padding: 0;">
            <b-navbar-brand to="/" style="position: relative;margin: auto;">Kis Piano</b-navbar-brand>
        </b-navbar>
        <div class="text-center" style="margin-top: 10%;">
            <img style="width: 80px;height: 80px;" src="../assets/logo.png">
            <div>V{{version}}</div>
            <div><small>官网：<a href="http://kischang.top/" target="_blank">http://kischang.top/</a></small></div>
            <div><small>开源地址：<a href="https://github.com/kisChang/" target="_blank">https://github.com/kisChang/</a></small></div>
            <div style="padding: 0 10%;"><small>个人制作工具软件，服务端全部依赖用 ❤ 发电，不保证服务质量。</small></div>
            <div style="display: none;">
                <div><small>赏个茶叶钱：</small></div>
                <div class="container">
                    <div class="row">
                        <a class="card col-6" href="https://qr.alipay.com/fkx16863fsmsubd4cs7i632">
                            <img src="../assets/alipay.png" class="card-img-top" alt="Alipay">
                            <div class="card-body" style="padding: 5px;">
                                Alipay
                            </div>
                        </a>
                        <div class="card col-6" ><!--href="wxp://f2f0mMBbwpMWAUFibE9RrSK46npztfTO0Yb5"-->
                            <img src="../assets/wechat.png" class="card-img-top" alt="Wechat">
                            <div class="card-body" style="padding: 5px;">
                                Wechat
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <cusFooter style="margin-top: 2rem;" />
        </div>
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