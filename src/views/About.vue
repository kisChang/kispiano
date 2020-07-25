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
            <div style="padding: 0 10%;"><small>个人制作工具软件，服务器运行依赖用 ❤ 发电，不保证服务质量。</small></div>
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

            <div style="display: none;">
                用户协议：<br/>
                1. 服务器运行依赖用 ❤ 发电，不保证服务质量，如果出现访问异常，请等待一会定时系统检查后会自动恢复。<br/>
                2. 提供匿名上传功能，但不做上传身份管理，您上传的所有资料，均作为开放资源进行公开，但在这之前我会审核，违规内容会删除并禁止对应的IP段<br/>
                3. 可以匿名发送资源需求，通过审核后，会发布在求谱区，有相关资源者可以上传分享，同样审核通过后会公布<br/>
                4. 站内会投放一些广告，如果广告收入不错的话，会扩充一些服务器资源<br/>
                5. 提供赞助二维码，所有收款记录均可在站内查询，我会定期整理。<br/>
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