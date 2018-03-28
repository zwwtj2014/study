const gulp = require("gulp");

gulp.task("default", () => {
    console.log("default task");
});

// 收集src的js文件, copy一份到build下
gulp.src("src/**/*.js").pipe(gulp.dest("build"));
