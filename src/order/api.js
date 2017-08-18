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


let chained_http=(apiName)=>(formData)=>(callback)=>{
   let param = {
        params:formData,
        method:'get',
        url:api_list(apiName)
    };
    return Vue.http(param).then((res)=>callback(res.body));
    // return Vue.http(param).then(function(res){
    //     console.log(" res:",res);
    //     return callback(res.body);
    // });
};

export default chained_http