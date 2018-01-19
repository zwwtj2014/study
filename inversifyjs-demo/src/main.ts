import container from './inversify.config';
import { Warrior } from './interfaces';
import TYPES from './types';

var ninja = container.get<Warrior>(TYPES.Warrior);

console.log(ninja.fight());
console.log(ninja.sneak());
