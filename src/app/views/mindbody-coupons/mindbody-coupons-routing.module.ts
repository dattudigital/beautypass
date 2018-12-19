import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MindbodyCouponsComponent } from './mindbody-coupons.component';

console.log("locading**************")
const routes: Routes = [
  {
    path: '', component: MindbodyCouponsComponent,
    data: {
      title: 'Mindbody'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MindbodyCouponsRoutingModule {}