import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { EmployeesComponent } from './employees.component';
import { EmployeesRoutingModule } from './employees-routing.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModule} from 'ngx-bootstrap/alert';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import {ToastyModule} from 'ng2-toasty';
import { TableModule } from 'primeng/table';
import { AuthGuard } from '../../common-session/session.check'

@NgModule({
  imports: [   
    CommonModule,
    EmployeesRoutingModule,
    NgxSpinnerModule,
    ModalModule.forRoot(),
    AlertModule.forRoot(),  
    ToastyModule,
    FormsModule,
    NgxPaginationModule  ,
    TableModule ,
    ReactiveFormsModule
  ],
  declarations: [ EmployeesComponent ],
  providers:[AuthGuard]
})
export class EmployeesModule { }