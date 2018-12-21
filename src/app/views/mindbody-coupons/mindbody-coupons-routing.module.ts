import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MindbodyCouponsComponent } from './mindbody-coupons.component';
import { MindbodyCouponsBulkComponent } from './mindbody-coupon-bulk.component';

console.log("locading**************")
// const routes: Routes = [
//   {
//     path: '', component: MindbodyCouponsComponent,
//     data: {
//       title: 'Mindbody'
//     }
//   }
// ];

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Buttons'
    },
    children: [
      {
        path: '',
        redirectTo: 'mindbody-coupons'
      },
      {
        path: 'mindbody-coupons',
        component: MindbodyCouponsComponent,
        data: {
          title: 'MindbodyCouponsComponent'
        }
      },
      {
        path: 'mindbody-coupons/bulk',
        component: MindbodyCouponsBulkComponent,
        data: {
          title: 'Bulk Upload'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MindbodyCouponsRoutingModule {}