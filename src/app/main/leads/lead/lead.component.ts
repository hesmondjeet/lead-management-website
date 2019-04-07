import { Component, OnInit } from '@angular/core';
import { statusModel } from '../../../models/status.model';
import { LeadService } from './lead.service';
import { MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-lead',
  templateUrl: './lead.component.html',
  styleUrls: ['./lead.component.scss']
})
export class LeadComponent implements OnInit {

  statuses = statusModel;
  lead: any;
  form: FormGroup;

  constructor(private ls: LeadService,
    private snackbar: MatSnackBar,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.lead = this.ls.lead;
    this.reset();
  }

  save() {
    this.ls.saveLead(this.form.value);
    this.snackbar.open("Lead has been saved!", "OK", {duration: 2000});
  }

  reset() {
    this.form = this.formBuilder.group({
      name: [this.lead.name || '', Validators.required],
      email: [this.lead.email || ''],
      phone: [this.lead.phone || ''],
      status: [this.lead.status || 1]
    });
    this.form.markAsPristine();
  }

}
