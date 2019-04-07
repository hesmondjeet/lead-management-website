import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LeadService implements Resolve<any> {

  routeParams: any;
  lead: any;
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
        this.http.get(environment.server + `/leads/${leadId}`)
        .toPromise()
        .then(response => {
          this.lead = response;
          resolve(this.lead);
        });
      } else {
        this.lead = { name: "", email: "", phone: "", status: 1 };
        resolve(this.lead);
      }
    });
  }

  saveLead(lead: any) {
    if(this.routeParams.leadId === 'new') {
      console.log("Calling POST: ", lead);
      return this.http.post(environment.server + `/leads`, lead).toPromise();
    } else {
      console.log("Calling PUT: ", lead);
      return this.http.put(environment.server + `/leads/${this.routeParams.leadId}`, lead).toPromise();
    }
  }
}
