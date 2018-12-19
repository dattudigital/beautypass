import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserActivitiesComponent } from './user-activities.component';
import { UserHistoryComponent } from './user-history.component';
import { PerksComponent } from './perks.component';

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
        }
      },
      {
        path: 'user-history',
        component: UserHistoryComponent,
        data: {
          title: 'User History'
        }
      },
      {
        path: 'perks',
        component: PerksComponent,
        data: {
          title: 'User History'
        }
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RefferalRewardsRoutingModule {}
