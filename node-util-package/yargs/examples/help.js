/**
 * 帮助信息
 * => usage: 用法格式
 * => example: 提供例子
 * => help: 显示帮助信息
 * => epilog: 出现在帮助信息的结尾
 */
var argv = require("yargs")
    .option("n", {
        alias: "name",
        demand: true,
        default: "clam",
        describe: "your name",
        type: "string"
    })
    .usage("Usage: hello [options]")
    .example("hello -n clam", "say hello to clam")
    .help("help")
    .alias("help", "h")
    .epilog("copyright 2015").argv;

// console.log("hello ", argv.n);
