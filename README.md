## Usage
###local

    npm run dev
>1.本地开发的时候运行此命令,不需要启动后端服务,会自动开启本地服务。后端模板,路由在build/server中进行修改,添加
>2.开发服务器启动后，双击命令行上的链接地址即可在浏览器中打开首页。你可以在`config`文件夹中修改你的开发服务器配置。
编写代码保存，浏览器即可热刷新。
>3.因为前端入口文件只有一个,首页server/router.js配置路由的时候也都是走通用模板,不需要建立多个后端模板文件

**注意：**
>1.修改入口js不支持热刷新从而导致整个页面自动刷新。
2.页面在进入时闪烁，是因为css是通过js追加的。
3.该模式下生成的资源都是在内存中进行服务，不会输出到dist目录。
<u>这些都是正常现象，请放心使用！</u>

 
    npm run build
> 与后端人员联调的时候,执行改命令,不支持热加载   


### test / beta / prod
 
    
    npm run prod
    
>1.打包，发布，上线都是这个命令。
2.你可以随时通过`Ctrl+C`终止操作下一步操作。
3.生成的资源在dist目录下，打包在zip目录下。
4.因为用了按需加载,所以css并没有提取到一个单独的css文件，而是通过stlye样式内联进来的
5.按需加载的原因,需要生成manifest.json文件,json文件里面的versionFiles是需要后端加上版本号的资源文件。
在上传包的时候需要选择第三种上传方式,即选择'根据manifest管理方式上传'这种上传方式。
6.输入npm run prod打包时,首先需要输入上传包的环境。在输入上传包的环境的时候,支持输入'prod',但是这种情况下只支持生成线上zip包,不支持自动上传zip包,因为线上包是上传到ftp,由运营人员来上传的


根据manifest管理方式上传zip包的时候，会查找mainfest.json里面的'versionFiles'自动，只有这个字段里面的资源文件才会
加上版本号，不在这个字段里面的资源文件后端不会给改资源文件加版本号。


### 图片压缩
> npm run imagemin 

考虑到sketch导出的图片比较大,所以集成了图片压缩。但是因为使用的是`gulp-tinypng`在线压缩图片，所以速度比较慢，所以有下面几点要注意:
* 对需要压缩的图片命名为[name(图片名)].min.[ext(图片后缀)]
* 只对src目录下面的图片进行了压缩，压缩后的文件直接替换了压缩前的文件
* 如果图片没有新增，这个命令只需要执行一次即可
* 为了和打包命令集成，新加了一个`npm run prod-imagemin`命令。`npm run prod-imagemin`命令其实就是`npn run imagemin`(图片完全压缩好之后)执行`npm run prod`



    
###build
    

    npm run build

>1.一般用来检查webpack生成的代码(生成的资源是无压缩的)。
2.可以用来调试线上环境。
操作步骤(以测试环境为例)：
1. 把测试环境静态服务器指向本地，如下:
10.7.248.201 house-test-water.oss.aliyuncs.com
2. 在nginx中把线上环境资源文件映射到本地,如下：
location ~* /iwjw-finwxent_test/(.*)_(?:.*).(css|js){
    add_header Access-Control-Allow-Origin *;
    alias   /Users/houzhenghua/workspace/static/qqd-wxent/dist/$1.$2;
}
3. 接着命令行重启nginx (sudo nginx -s reload)
4. 项目目录下运行`npm run build`，即可用本地代码代理到测试环境，测试环境的js,css就指向本地了,方便调试线上问题



    python ftp.py qqd-wxent  1.0.2
 > python ftp.py 项目 版本号
 > 上线的时候通过上面这个命令把zip文件夹下面的.zip包上传到ftp


//问题：项目上线遇到了,资源文件403,右键打开资源，在浏览器访问一次才能正常打开页面的情况
//原因：后端加了设置防盗链功能，但是没有把项目的新域名http://qqdwx.iwtouzi.com/加入到白名单导致的
//解决办法:把http://*.iwtouzi.com https://*.iwtouzi.com 加入到白名单配置文件里面




