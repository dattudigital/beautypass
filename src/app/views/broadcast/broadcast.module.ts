// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// Alert Component
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AlertModule} from 'ngx-bootstrap/alert';
import { broadcastPackageSmsComponent } from './broadcast-package-sms.component';
import { broadcastSmsComponent } from './broadcast-sms.component';
import { BroadcastRoutingModule } from './broadcast-routing.module';
// Modal Component
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AlertModule,
    BroadcastRoutingModule,
    NgxPaginationModule,
    NgxSpinnerModule,
    BsDropdownModule.forRoot(),
    AlertModule.forRoot(),
    ModalModule.forRoot()
  ],
  declarations: [
    broadcastPackageSmsComponent,
    broadcastSmsComponent
  ]
})
export class BroadcastModule { }
