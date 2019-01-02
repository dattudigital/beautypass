import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EmployeeHistoryComponent } from './employee-history.component';
import { EmployeeHistoryRoutingModule } from './employee-history-routing.module';
import { TableModule } from 'primeng/table';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
    imports: [
        CommonModule,
        EmployeeHistoryRoutingModule,
        TableModule,
        NgxSpinnerModule
    ],
    declarations: [EmployeeHistoryComponent]
})
export class EmployeeHistoryModule { }