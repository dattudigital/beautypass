import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../common-session/session.check'
import { EmployeesComponent } from './employees.component';

console.log("locading**************")
const routes: Routes = [
  {
    path: '', component: EmployeesComponent,
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
export class EmployeesRoutingModule {}


