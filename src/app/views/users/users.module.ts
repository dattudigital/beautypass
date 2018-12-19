import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { UsersComponent } from './users.component';
import { UsersRoutingModule } from './users-routing.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModule} from 'ngx-bootstrap/alert';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [   
    CommonModule,
    UsersRoutingModule,
    FormsModule,
    AlertModule,
    ModalModule,
    NgxSpinnerModule,
    NgxPaginationModule   
  ],
  declarations: [ UsersComponent ]
})
export class UsersModule { }