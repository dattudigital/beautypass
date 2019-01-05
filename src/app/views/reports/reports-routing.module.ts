import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VoucherComponent } from './voucher.component';
import { AuthGuard } from '../../common-session/session.check';
import {PerksReportComponent} from './perks-report.component';
import {PointsReportComponent} from './points-report.componnet';

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
      },
      {
        path: 'perks',
        component: PerksReportComponent,
        data: {
          title: 'perks'
        },
        canActivate: [AuthGuard]
      },
      {
        path: 'points',
        component: PointsReportComponent,
        data: {
          title: 'points'
        },
        canActivate: [AuthGuard]
      },

    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule {}
