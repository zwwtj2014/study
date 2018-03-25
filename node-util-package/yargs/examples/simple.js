const argv = require("yargs").alias("n", "name").argv; // const argv = require('yargs').parse();

// node .\examples\simple.js -n clam => hello clam
// node .\examples\simple.js --name clam => hello clam
// node .\examples\simple.js --name=clam => hello clam
console.log("hello ", argv.n);

// node .\examples\simple.js A -n clam B
// ===> hello clam
// ===> argv._: A,B (获取非连词线开头的参数)
console.log(`argv._: ${argv._}`);
