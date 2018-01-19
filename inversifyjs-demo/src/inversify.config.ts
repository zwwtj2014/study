import { Container } from 'inversify';
import TYPES from './types';
import { Ninja, Katana, Shuriken } from './impls';
import { ThrowableWeapon, Warrior, Weapon } from './interfaces';

var container = new Container();
container.bind<Warrior>(TYPES.Warrior).to(Ninja);
container.bind<Weapon>(TYPES.Weapon).to(Katana);
container.bind<ThrowableWeapon>(TYPES.ThrowableWeapon).to(Shuriken);

export default container;
