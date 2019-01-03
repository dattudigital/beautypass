import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VoucherComponent } from './voucher.component';
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
        redirectTo: 'voucher'
      },
      {
        path: 'voucher',
        component: VoucherComponent,
        data: {
          title: 'voucher'
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
export class ReportsRoutingModule {}
