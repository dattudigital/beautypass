// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// Alert Component
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AlertModule} from 'ngx-bootstrap/alert';
import { UserActivitiesComponent } from './user-activities.component';
import { UserHistoryComponent } from './user-history.component';
import { PerksComponent } from './perks.component';
import { RefferalRewardsRoutingModule } from './refferal-rewards-routing.module';

import { TypeaheadModule } from "ngx-bootstrap";
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TableModule } from 'primeng/table';
declare var jsPDF: any;

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TypeaheadModule,
    ReactiveFormsModule,
    AlertModule,
    TableModule,
    RefferalRewardsRoutingModule,
    NgxPaginationModule,
    NgxSpinnerModule,
    BsDropdownModule.forRoot(),
    AlertModule.forRoot(),
    ModalModule.forRoot()
    
  ],
  declarations: [
    UserActivitiesComponent,
    UserHistoryComponent,
    PerksComponent
  ],
  
})
export class RefferalRewardsModule { }
