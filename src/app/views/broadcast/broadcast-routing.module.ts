import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { broadcastSmsComponent } from './broadcast-sms.component';
import { broadcastPackageSmsComponent } from './broadcast-package-sms.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Buttons'
    },
    children: [
      {
        path: '',
        redirectTo: 'broadcast-all'
      },
      {
        path: 'broadcast-all',
        component: broadcastSmsComponent,
        data: {
          title: 'broadcast-all'
        }
      },
      {
        path: 'broadcast-packages',
        component: broadcastPackageSmsComponent,
        data: {
          title: 'Broadcast Packages'
        }
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BroadcastRoutingModule {}
