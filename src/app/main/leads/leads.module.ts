import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeadsComponent } from './leads/leads.component';
import { LeadComponent } from './lead/lead.component';
import { ConfirmDeleteDialog } from './leads/confirm-delete/confirm-delete.component';
import { RouterModule, Routes } from '@angular/router';
import { LeadsService } from './leads/leads.service';
import { LeadService } from './lead/lead.service';
import { MatTableModule, MatIconModule, MatButtonModule, MatMenuModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatDialogModule, MatSnackBarModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path        : '',
    component   : LeadsComponent,
    resolve     : {
      contacts: LeadsService
    }
  },
  {
    path        : ':leadId',
    component   : LeadComponent,
    resolve: {
      data: LeadService
    }
  }
];

@NgModule({
  declarations: [
    LeadsComponent, 
    LeadComponent, 
    ConfirmDeleteDialog
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatSnackBarModule,
    FlexLayoutModule,
    
    FormsModule,
    ReactiveFormsModule,
  ],
  entryComponents: [
    ConfirmDeleteDialog
  ]
})
export class LeadsModule { }
