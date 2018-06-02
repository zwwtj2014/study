import { Routes, RouterModule } from '@angular/router';
import { PlaygroundComponent } from './playground.component';
import { NgModule } from '@angular/core';
import { OneComponent } from './one/one.component';
import { TwoComponent } from './two/two.component';
import { ThreeComponent } from './three/three.component';

const routes: Routes = [
  {
    path: '',
    component: PlaygroundComponent,
    children: [
      {
        path: 'one',
        component: OneComponent
      },
      {
        path: 'two',
        component: TwoComponent,
        children: [
          {
            path: 'three',
            component: ThreeComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlaygroundRoutingModule {}
