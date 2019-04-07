import { Component, OnInit } from '@angular/core';
import { statusModel } from '../../../models/status.model';
import { LeadService } from './lead.service';
import { MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lead',
  templateUrl: './lead.component.html',
  styleUrls: ['./lead.component.scss']
})
export class LeadComponent implements OnInit {

  statuses = statusModel;
  form: FormGroup;

  constructor(private ls: LeadService,
    private snackbar: MatSnackBar,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.reset();
    });
  }

  save() {
    this.ls.saveLead(this.form.value)
    .then(response => {
      this.ls.lead = response;
      this.reset();
      this.snackbar.open("Lead has been saved!", "OK", {duration: 2000});
    });
    
  }

  reset() {
    this.form = this.formBuilder.group({
      name: [this.ls.lead.name || '', Validators.required],
      email: [this.ls.lead.email || ''],
      phone: [this.ls.lead.phone || ''],
      status: [this.ls.lead.status || 1],
      agent_id: [this.ls.agentId]
    });
    this.form.markAsPristine();
  }

}
