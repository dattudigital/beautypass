// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// Alert Component
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AlertModule} from 'ngx-bootstrap/alert';
import { WrittenTestimonialsComponent } from './written-testimonials.component';
import { VideoTestimonialsComponent } from './video-testimonials.component';
import { TestimonialsRoutingModule } from './testimonials-routing.module';
// Modal Component
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TableModule } from 'primeng/table';
import {ToastyModule} from 'ng2-toasty';
import { AuthGuard } from '../../common-session/session.check';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AlertModule,
    TestimonialsRoutingModule,
    NgxPaginationModule,
    NgxSpinnerModule,
    BsDropdownModule.forRoot(),
    AlertModule.forRoot(),
    ModalModule.forRoot(),
    ToastyModule.forRoot(),
    TableModule,
    ReactiveFormsModule
  ],
  declarations: [
    WrittenTestimonialsComponent,
    VideoTestimonialsComponent,
  ],
  providers:[AuthGuard]
})
export class TestimonialsModule { }
