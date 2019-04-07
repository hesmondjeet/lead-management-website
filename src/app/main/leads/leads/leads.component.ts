import { Component, OnInit } from '@angular/core';
import { statusModel } from '../../../models/status.model';
import { LeadsService } from './leads.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ConfirmDeleteDialog } from './confirm-delete/confirm-delete.component';

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.scss']
})
export class LeadsComponent implements OnInit {

  status = statusModel;
  leads: any[] = [];
  displayedColumns: string[] = ['name', 'email', 'phone', 'status', 'action'];

  constructor(private ls: LeadsService, 
    private dialog: MatDialog,
    private snackbar: MatSnackBar) { }

  ngOnInit() {
    this.leads = this.ls.leads;
  }

  /**
   * Confirms to delete, then calls delete service
   * @param leadId mandatory lead ID
   */
  remove(leadId: string) {
    const dialogRef = this.dialog.open(ConfirmDeleteDialog, {});

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.ls.deleteLead(leadId);
        this.snackbar.open("Lead has been deleted.", "OK", {duration: 2000});
      }
    });
  }

}
