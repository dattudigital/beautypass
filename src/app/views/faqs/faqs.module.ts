import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { FaqsComponent } from './faqs.component';
import { FaqsRoutingModule } from './faqs-routing.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModule} from 'ngx-bootstrap/alert';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [   
    CommonModule,
    FaqsRoutingModule,
    NgxSpinnerModule,
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    FormsModule,
    NgxPaginationModule   
  ],
  declarations: [ FaqsComponent ]
})
export class FaqsModule { }