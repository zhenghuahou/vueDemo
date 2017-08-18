var logUrl = pageConfig.datacollectUrl;

var log = {
    init: function( options) {
        var self = this;
        self.__options = options || {};
        self.__switchLog();
    },
    __switchLog: function() {
        var self = this;
        $.jps.on('log', function(options) {
            // self.__resetLogData(); //重置数据
            self.__resetH5Data();
            var logData = self.__logdata;
            switch (options.type) {
                // case 'http-error':
                //     logData.logTime = new Date().strftime('%Y-%m-%dT%H:%M:%S');
                //     logData.logLevel = 'ERROR';
                //     logData.projectName = 'iwjw-pc';
                //     logData.IMEI = '';
                //     logData.OS = 'web';
                //     $.extend(logData, options);
                //     self.sendErrorLogData(logData);
                //     break;

                case 'map-loaded-time':
                    $.extend(logData, options);
                    self.sendErrorLogData(logData);
                    break;

                // case 'http-success':
                //     $.extend(logData, options);
                //     self.sendErrorLogData(logData);
                //     break;

                // case 'search':
                //     self.__logdata.clt = options.queryType;
                //     self.__logdata.ck = options.key;
                //     self.__logdata.sk = options.inputVal;
                //     self.__logdata.cid = options.cid;
                //     self.__sendLogData();
                //     break;

                case 'filter':
                    self.__logdata.sw_le = options.line;
                    self.__logdata.sw_st = options.station;
                    self.__logdata.dt_rg = options.region;
                    self.__logdata.dt_ae = options.area;
                    self.__logdata.ret = options.rental;
                    self.__logdata.bdr = options.bedroom;
                    self.__sendLogData();
                    break;

                case 'detail':
                    self.__logdata.hos = options.currentCode;
                    self.__logdata.rem = options.remCodes;
                    self.__logdata.act_k = options.act_k;
                    self.__logdata.act_v = options.act_v;
                    self.__logdata.title = options.title;
                    self.__logdata.est = options.est;
                    self.__logdata.postition = options.postition;
                    self.__logdata.place = options.place;
                    if (options.ht){
                        self.__logdata.vtp = options.ht;
                    }
                    self.__sendLogData();
                    break;

                case 'h5Basic':
                    self.__resetH5Data();
                    self.__sendH5Data();
                    break;

                case 'h5Click':
                    self.__resetH5Data();
                    self.__logdata.act_k = options.act_k || '';
                    self.__logdata.act_v = options.act_v || '';
                    self.__logdata.act_l = options.act_l || '';
                    self.__logdata.dt_rg = options.dt_rg || '';
                    self.__logdata.dt_ae = options.dt_ae || '';
                    self.__logdata.sw_le = options.sw_le || '';
                    self.__logdata.sw_st = options.sw_st || '';
                    self.__logdata.hos = options.hos || '';
                    self.__logdata.est = options.est || '';
                    self.__logdata.title = options.title || '';
                    self.__logdata.place = options.place || '';
                    self.__logdata.callBack = options.callback || '';
                    self.__sendH5Data()
                    break;

                case 'h5Search':
                    self.__resetH5Data();
                    self.__logdata.clt = options.queryType;
                    self.__logdata.ck = options.key;
                    self.__logdata.sk = options.inputVal;
                    self.__logdata.cid = options.cid;
                    self.__logdata.tips = options.tips
                    self.__sendH5Data()
                    break;

                case 'recommend':
                    self.__logdata.rem_title = options.rem_title;
                    self.__logdata.rem_place = options.rem_place;
                    self.__sendLogData();
                    break;

            }
        });
    },

    // __resetLogData: function() {
    //     var self = this;
    //     var options = self.__options;
    //     self.__logdata = {};
    //     if (!pageConfig.visitor) return false;
    //     var user = pageConfig.visitor.user || {};
    //     var province = pageConfig.visitor.province || {};
    //     self.__logdata = {
    //         uid: user.uuid, // 获取uuid
    //         usid: user.userId, // 获取用户id
    //         ct: province.id, // 城市id
    //         ss: screen.width + '*' + screen.height, // 屏幕显示大小
    //         bs: $(window).width() + '*' + $(window).height(), // 浏览器显示大小
    //         url: encodeURI(window.location.href), // 当前url
    //         ref: encodeURI(document.referrer), // 用户上一页面url
    //         vtp: options.ht || 0,
    //         pf: 'pc-web'
    //     };
    // },

    __sendLogData: function() {
        var self = this;
        $.ajax({
            url: logUrl + 'track/user/web.do',
            data: self.__logdata,
            dataType: 'jsonp'
        })
    },

    sendErrorLogData: function(logData){
        var self = this;

        $.ajax({
            url: logUrl + 'errorlog.do',
            data: JSON.stringify(logData),
            type: 'post',
            global: false
        })
         
    },

    __resetH5Data: function() {
        let self = this;

        let options = self.__options,
            pf = '',
            url = window.location.href,
            index = url.indexOf('#'),
            provinceId = '',
            user = {};

        // if(index > 0){
        //     url = url.slice(0,index);
        // }

        self.__logdata = {};

        if (!pageConfig.visitor){
            return false;
        }

        provinceId = pageConfig.provinceid || {};
        user = pageConfig.visitor.user || {};
        
        self.__logdata = {
            uid: user.uuid || '', // 获取uuid
            ct: provinceId, // 城市id
            url: encodeURIComponent(encodeURIComponent(url)), // 当前url
            ref: encodeURI(document.referrer), // 用户上一页面url
            vtp: options.ht ||  0,
            pf:'app-web'
        };
    },

    __sendH5Data: function() {
        var self = this;
        if(global.browser.isApp){
            self.__logdata.pf = 'app-inline';
            // console.log(self.__logdata);
            //APP内嵌M站页面埋点
            bridge.datacollection({
                data: self.__logdata
            },function () {
                self.__logdata.callBack && self.__logdata.callBack();
            });
        }else{
            //M站埋点
            self.__logdata.pf = 'app-web';
            $.ajax({
                url: logUrl + 'track/user/web.do',
                data: self.__logdata,
                dataType: 'jsonp'
            })
        }
    },

    clickTrigger: function(act_k, act_v,callback) {

        $.jps.trigger('log', { //日志
            type: 'h5Click',
            act_k: act_k,
            act_v: act_v,
            callback:callback
        });

    }
};

module.exports = log;

// $(function() {
log.init(pageConfig);
// });

/**
 * 外部来源webPV统计
 * 报表系统显示：http://report.fyb365.com/reporter/main.jsp, 爱屋Web统计-->爱屋WebPV统计
 */
if (!!global.paramOfUrl(location.href).tpa) {
    $.ajax({
        url: 'iwStatistics.action',
        data: {
            tpa: global.paramOfUrl(location.href).tpa,
            ref: document.referrer
        }
    });
}

//监控注册的统计，了解下原委
if (localStorage.getItem("registMobile") && localStorage.getItem("registUserId")) {
    var _mvq = window._mvq || [];
    window._mvq = _mvq;
    _mvq.push(['$setAccount', 'm-80613-0']);
    _mvq.push(['$setGeneral', 'registered', '', localStorage.getItem("registMobile"), localStorage.getItem("registUserId")]);
    _mvq.push(['$logConversion']);
    //删除缓存
    localStorage.removeItem("registMobile");
    localStorage.removeItem("registUserId");
}