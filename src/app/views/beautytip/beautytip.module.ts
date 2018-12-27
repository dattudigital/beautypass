import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { BeautyTipsComponent } from './beautytip.component';
import { BeautytipRoutingModule } from './beautytip-routing.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModule} from 'ngx-bootstrap/alert';
import { FormsModule } from '@angular/forms';
import { SimpleNotificationsModule } from 'angular2-notifications';

@NgModule({
  imports: [   
    CommonModule,
    BeautytipRoutingModule,
    SimpleNotificationsModule,
    NgxSpinnerModule,
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    FormsModule,
    NgxPaginationModule   
  ],
  declarations: [ BeautyTipsComponent ]
})
export class BeautytipModule { }