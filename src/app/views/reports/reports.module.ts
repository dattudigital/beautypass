
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AlertModule } from 'ngx-bootstrap/alert';
import { VoucherComponent } from './voucher.component';
import { PerksReportComponent } from './perks-report.component'
import { ReportsRoutingModule } from './reports-routing.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TableModule } from 'primeng/table';
import { AuthGuard } from '../../common-session/session.check'
import { PointsReportComponent } from './points-report.componnet';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AlertModule,
    ReportsRoutingModule,
    NgxPaginationModule,
    NgxSpinnerModule,
    BsDropdownModule.forRoot(),
    AlertModule.forRoot(),
    ModalModule.forRoot(),
    TableModule
  ],
  declarations: [
    VoucherComponent,
    PerksReportComponent,
    PointsReportComponent
  ],
  providers: [AuthGuard]
})
export class ReportsModule { }
