var  gulp = require("gulp");
var  less = require("gulp-less");
var cssmin= require("gulp-clean-css");
var jsmin = require("gulp-uglify");
var htmlmin = require("gulp-htmlmin");
var connect = require("gulp-connect");


//压缩html
gulp.task("html",function(){
	var options = {
		removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
	};
	gulp.src("src/html/*.html").pipe(htmlmin(options)).pipe(gulp.dest("dest/html"));

})


//压缩css
gulp.task("css",function(){
	gulp.src("src/public/less/*.less").pipe(less()).pipe(cssmin()).pipe(gulp.dest("dest/public/css"));
})



//压缩 js
gulp.task("js",function(){
	var options ={except: ['require' ,'exports' ,'module' ,'$']}//排除混淆关键字
	gulp.src("src/public/js/*.less").pipe(jsmin(options)).pipe(gulp.dest("dest/public/js"))
})



//监听
gulp.task("watch",function(){
	gulp.watch("src/html/*.html",["html","htmlReload"]);
	gulp.watch("src/public/less/*.less",["css","htmlReload"]);
	gulp.watch("src/public/js/*.js",["js","htmlReload"])
})


//刷新页面
gulp.task("htmlReload",function(){
	gulp.src("src/public/html/*.html").pipe(connect.reload());
})


//配置服务器

gulp.task("server",function(){
		connect.server({
			root:"dest",//服务器目录地址
			port:8001,
			livereload:true//自动更新
		})
})



//开启服务器与监听

gulp.task("default",["server","watch"]);

//gulp初始化

gulp.task("init",["html","css","js"])