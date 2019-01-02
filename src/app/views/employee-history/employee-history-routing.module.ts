import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EmployeeHistoryComponent} from './employee-history.component';

const routes: Routes = [
    {
      path: '', component: EmployeeHistoryComponent,
      data: {
        title: 'employee-history'
      }
    }
   ];
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class EmployeeHistoryRoutingModule {}