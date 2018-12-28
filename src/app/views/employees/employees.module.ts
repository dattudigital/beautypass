import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { EmployeesComponent } from './employees.component';
import { EmployeesRoutingModule } from './employees-routing.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModule} from 'ngx-bootstrap/alert';
import { FormsModule } from '@angular/forms';
import {ToastyModule} from 'ng2-toasty';

@NgModule({
  imports: [   
    CommonModule,
    EmployeesRoutingModule,
    NgxSpinnerModule,
    ModalModule.forRoot(),
    AlertModule.forRoot(),  
    ToastyModule.forRoot(),
    FormsModule,
    NgxPaginationModule   
  ],
  declarations: [ EmployeesComponent ]
})
export class EmployeesModule { }