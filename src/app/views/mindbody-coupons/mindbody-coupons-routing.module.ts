import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MindbodyCouponsComponent } from './mindbody-coupons.component';
import { MindbodyCouponsBulkComponent } from './mindbody-coupon-bulk.component';
import { AuthGuard } from '../../common-session/session.check'

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
        },
        canActivate: [AuthGuard]
      },
      {
        path: 'mindbody-coupons/bulk',
        component: MindbodyCouponsBulkComponent,
        data: {
          title: 'Bulk Upload'
        },
        canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MindbodyCouponsRoutingModule {}