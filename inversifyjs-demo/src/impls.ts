import { ThrowableWeapon, Warrior, Weapon } from './interfaces';

import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import TYPES from './types';

@injectable()
class Katana implements Weapon {
  public hit() {
    return 'cut!';
  }
}

@injectable()
class Shuriken implements ThrowableWeapon {
  public throw() {
    return 'hit!';
  }
}

@injectable()
class Ninja implements Warrior {
  private _katana: Katana;
  private _shuriken: ThrowableWeapon;

  public constructor(
    @inject(TYPES.Weapon) katana: Weapon,
    @inject(TYPES.ThrowableWeapon) shuriken: ThrowableWeapon
  ) {
    this._katana = katana;
    this._shuriken = shuriken;
  }

  fight(): string {
    return this._katana.hit();
  }
  sneak(): string {
    return this._shuriken.throw();
  }
}

export { Ninja, Katana, Shuriken };
