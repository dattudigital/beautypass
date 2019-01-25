import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../common-session/session.check'
import { BeautyTipsComponent } from './beautytip.component';

const routes: Routes = [
  {
    path: '', component: BeautyTipsComponent,
    data: {
      title: 'Employee'
    },
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BeautytipRoutingModule {}
