import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserActivitiesComponent } from './user-activities.component';
import { UserHistoryComponent } from './user-history.component';
import { UserPointsComponent } from './user-points.component';
import { PerksComponent } from './perks.component';
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
        redirectTo: 'user-activities'
      },
      {
        path: 'user-activities',
        component: UserActivitiesComponent,
        data: {
          title: 'User Activities'
        },
        canActivate: [AuthGuard]
      },
      {
        path: 'user-history',
        component: UserHistoryComponent,
        data: {
          title: 'User History'
        },
        canActivate: [AuthGuard]
      },
      {
        path: 'user-points',
        component: UserPointsComponent,
        data: {
          title: 'User History'
        },
        canActivate: [AuthGuard]
      },
      {
        path: 'perks',
        component: PerksComponent,
        data: {
          title: 'User History'
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
export class RefferalRewardsRoutingModule { }
