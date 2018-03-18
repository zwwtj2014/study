const argv = require("yargs").argv;// const argv = require('yargs').parse();

if (argv.ships > 3 && argv.distance < 53.5) {
    console.log("Plunder more riffiwobbles!"); // node simple.js --ships 4 --distance 50
} else {
    console.log("Retreat from the xupptumblers!");
}
