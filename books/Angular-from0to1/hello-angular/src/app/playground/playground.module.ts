import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaygroundComponent } from './playground.component';
import { OneComponent } from './one/one.component';
import { TwoComponent } from './two/two.component';
import { ThreeComponent } from './three/three.component';
import { PlaygroundRoutingModule } from './playground-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, FormsModule, PlaygroundRoutingModule],
  declarations: [PlaygroundComponent, OneComponent, TwoComponent, ThreeComponent]
})
export class PlaygroundModule {}
