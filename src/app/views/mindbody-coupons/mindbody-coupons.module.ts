import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { MindbodyCouponsComponent } from './mindbody-coupons.component';
import { MindbodyCouponsBulkComponent } from './mindbody-coupon-bulk.component';
import { MindbodyCouponsRoutingModule } from './mindbody-coupons-routing.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModule } from 'ngx-bootstrap/alert';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MindbodyCouponsRoutingModule,
    NgxSpinnerModule,
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ],
  declarations: [
    MindbodyCouponsComponent,
    MindbodyCouponsBulkComponent
  ]
})
export class MindbodyCouponsModule { }
//UsersModule