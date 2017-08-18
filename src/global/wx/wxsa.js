/**
 * Created by zyy on 15/4/29.
 * zhangyuyu@superjia.com
 * 微信服务号的分享js
//  */
var weixin = {
    init: function(opt) {
        var opt = opt || '';
        var self = this;
        
        //非微信环境,不请求签名接口
        if(!global.browser.isWeixin){
            return;
        }

        $.ajax({
            type: 'post',
            url: '/finweixinent/wxSignature.action',
            dataType: 'json',
            cache: false,
            data: {
                url: location.href.split('#')[0]
            },
            success: function(res) {
                if (res && res.status == 0) {
                    wx.config({
                        debug: false,
                        appId: res.data.appId,
                        timestamp: res.data.timestamp,
                        nonceStr: res.data.nonceStr,
                        signature: res.data.signature,
                        jsApiList: [
                            'checkJsApi',
                            'onMenuShareTimeline',
                            'onMenuShareAppMessage',
                            'onMenuShareQQ',
                            'onMenuShareWeibo',
                            'onMenuShareQZone',
                            'hideMenuItems',
                            'showMenuItems',
                            'hideAllNonBaseMenuItem',
                            'showAllNonBaseMenuItem',
                            'translateVoice',
                            'startRecord',
                            'stopRecord',
                            'onVoiceRecordEnd',
                            'playVoice',
                            'onVoicePlayEnd',
                            'pauseVoice',
                            'stopVoice',
                            'uploadVoice',
                            'downloadVoice',
                            'chooseImage',
                            'previewImage',
                            'uploadImage',
                            'downloadImage',
                            'getNetworkType',
                            'openLocation',
                            'getLocation',
                            'hideOptionMenu',
                            'showOptionMenu',
                            'closeWindow',
                            'scanQRCode',
                            'chooseWXPay',
                            'openProductSpecificView',
                            'addCard',
                            'chooseCard',
                            'openCard'
                        ]
                    });

                    wx.ready(function() {

                        var config = $.extend({}, {
                            title: '爱屋吉屋',
                            link: window.pageConfig.mobileSiteUrl,
                            type: 'link',
                            imgUrl: window.pageConfig.staticUrl + 'common/img/logo_wx.png',
                            desc: '安家置业 大大不一样',
                            dataUrl: ''
                        }, opt);
                        wx.onMenuShareTimeline({
                            title: config.title,
                            link: config.link,
                            imgUrl: config.imgUrl,
                            type: config.type
                        });
                        wx.onMenuShareAppMessage({
                            title: config.title,
                            desc: config.desc,
                            link: config.link,
                            imgUrl: config.imgUrl,
                            type: config.type,
                            dataUrl: config.dataUrl
                        });
                    });
                    wx.error(function(err) {
                        alert('服务异常,请刷新尝试');
                    });
                }
            },
            error: function(err) {
                console.log(JSON.stringify(err));
            }
        });
    }
};

module.exports = weixin;
