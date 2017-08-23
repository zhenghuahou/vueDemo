import Vue from 'vue';
const api_list = (key) => {

    let root = pageConfig.contextPath || '';

    if (__DEV__) {
        // root = 'http://fe.iwjw.com:8888/api/fete_api/DaL9R5/P1HTb2/mockqqdwxent';
    }

    return root + {
        //我的订单
        'getOrderList': 'http://localhost:8001/api/myorder',
        //业绩详情
        'getCommissionDetailById': '/comission/getCommissionDetailById.action'
    }[key];
};

window.bar = function(data,er){
    console.log(" 00 data:",data);
    console.log('11 err：',er);
}
let chained_http=(apiName)=>(formData)=>(callback)=>{
   let param = {
        params:formData,
        method:'get',
        url:api_list(apiName)
    };
    // return Vue.http(param).then(function(res){
    return Vue.http.jsonp('http://10.8.44.202:8001/api/myorder').then(function(res){ //jsonp
        console.log(" res:",res);
        return callback(res.body);
    }).catch(function(error){
         console.warn(' error--->:',error);
    });
};

export default chained_http