import { NgModule } from '@angular/core';
import { PlaygroundComponent } from './playground.component';
import { OneComponent } from './one/one.component';
import { TwoComponent } from './two/two.component';
import { ThreeComponent } from './three/three.component';
import { PlaygroundRoutingModule } from './playground-routing.module';
import { TrimSpacePipe } from './trim-space.pipe';
import { SharedModule } from '../shared/shared.module';
import { LogOnClickDirective } from './log-onclick.directive';

@NgModule({
  imports: [SharedModule, PlaygroundRoutingModule],
  declarations: [PlaygroundComponent, OneComponent, TwoComponent, ThreeComponent, TrimSpacePipe, LogOnClickDirective]
})
export class PlaygroundModule {
  birthday = new Date();
  constructor() {}
}
