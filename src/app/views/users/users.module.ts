import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { UsersComponent } from './users.component';
import { UsersRoutingModule } from './users-routing.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModule } from 'ngx-bootstrap/alert';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { AuthGuard } from '../../common-session/session.check';
import { ToastyModule } from 'ng2-toasty';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule,
    AlertModule,
    ToastyModule,
    ModalModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    TableModule
  ],
  declarations: [UsersComponent],
  providers:[AuthGuard]
})
export class UsersModule { }