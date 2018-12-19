// import { CommonModule } from '@angular/common';
// import { NgModule } from '@angular/core';
// import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
// import { AlertModule} from 'ngx-bootstrap/alert';
// import { VoucherComponent } from './voucher.component';
// import { ReportsRoutingModule } from './reports-routing.module';
// import { ModalModule } from 'ngx-bootstrap/modal';
// import { FormsModule } from '@angular/forms';
// import { NgxPaginationModule } from 'ngx-pagination';
// import { NgxSpinnerModule } from 'ngx-spinner';

// @NgModule({
//   imports: [
//     CommonModule,
//     FormsModule,
//     AlertModule,
//     ReportsRoutingModule,
//     NgxPaginationModule,
//     NgxSpinnerModule,
//     BsDropdownModule.forRoot(),
//     AlertModule.forRoot(),
//     ModalModule.forRoot()
//   ],
//   declarations: [
//     VoucherComponent
//   ]
// })
// export class ReportsModule { }

// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// Alert Component
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AlertModule} from 'ngx-bootstrap/alert';
import { VoucherComponent } from './voucher.component';
import { ReportsRoutingModule } from './reports-routing.module';

import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';

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
    ModalModule.forRoot()
  ],
  declarations: [
    VoucherComponent
  ]
})
export class ReportsModule { }
