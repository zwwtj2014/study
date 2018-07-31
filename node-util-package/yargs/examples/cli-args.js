/**
 * 命令行参数的配置
 * => demand: 是否必选
 * => default: 默认值
 * => describe: 提示信息
 */

// 下面一段表示参数`n`必选, 默认值是`clam`, 并提示`your name`
var argv = require("yargs")
    .demand(["n"])
    .default({ n: "clam" })
    .describe({ n: "your name" })
    .boolean(["m"]).argv;

// node .\cli-args.js -m => hello clam; m is true
// node .\cli-args.js => hello clam; m is false
console.log(`hello ${argv.n}; m is ${argv.m}`);

var argvObject = require("yargs").option("n", {
    alias: "name",
    demand: true,
    default: "clam",
    describe: "your name",
    type: "string"
}).argv;

console.log(`hello ${argvObject.n}`);
