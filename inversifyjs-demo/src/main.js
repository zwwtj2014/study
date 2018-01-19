"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_config_1 = require("./inversify.config");
var types_1 = require("./types");
var ninja = inversify_config_1.default.get(types_1.default.Warrior);
console.log(ninja.fight());
console.log(ninja.sneak());
