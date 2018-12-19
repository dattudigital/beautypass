import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeesComponent } from './employees.component';

console.log("locading**************")
const routes: Routes = [
  {
    path: '', component: EmployeesComponent,
    data: {
      title: 'Employee'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule {}


