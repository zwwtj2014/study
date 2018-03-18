const yargs = require("yargs").usage(
    "webpack-cli " +
        require("../package.json").version +
        "\n" +
        "Usage: https://webpack.js.org/api/cli/\n" +
        "Usage without config file: webpack <entry> [<entry>] --output [-o] <output>\n" +
        "Usage with config file: webpack"
);
console.log(yargs);
