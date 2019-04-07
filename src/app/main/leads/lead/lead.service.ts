import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LeadService implements Resolve<any> {

  routeParams: any;
  lead: any = { name: "", email: "", phone: "", status: 1 };
  agentId: number = 1;

  constructor(private http: HttpClient) { }

  /**
   * Prerequisite before starting lead page
   * @param route 
   * @param state 
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.routeParams = route.params;
    return this.getLead(this.routeParams.leadId);
  }

  /**
   * Get specific lead details
   * @param leadId mandatory lead ID
   */
  getLead(leadId: string) {
    return new Promise((resolve, reject) => {
      if(leadId !== "new") {
        this.lead = {id: 1, name: "Lead One", email: "leadone@email.com", phone: "+60111111111", status: 1};
      }
      resolve(this.lead);
    });
  }

  saveLead(lead: any) {
    if(this.routeParams.leadId === 'new') {
      // call POST function
      console.log("Calling POST: ", lead);
    } else {
      //call PUT function
      console.log("Calling PUT: ", lead);
    }

    return lead;
  }
}
