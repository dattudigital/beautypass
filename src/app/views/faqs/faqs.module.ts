import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { FaqsComponent } from './faqs.component';
import { FaqsRoutingModule } from './faqs-routing.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModule } from 'ngx-bootstrap/alert';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
@NgModule({
  imports: [
    CommonModule,
    FaqsRoutingModule,
    NgxSpinnerModule,
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    TableModule
  ],
  declarations: [FaqsComponent]
})
export class FaqsModule { }