import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BeautyTipsComponent } from './beautytip.component';

console.log("locading**************")
const routes: Routes = [
  {
    path: '', component: BeautyTipsComponent,
    data: {
      title: 'Employee'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BeautytipRoutingModule {}
