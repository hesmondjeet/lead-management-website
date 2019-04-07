import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LeadsService implements Resolve<any> {

  routeParams: any;
  leads: any[];
  agentId: number = 1;

  constructor(private http: HttpClient) { }

  /**
   * Prerequisite before starting leads page
   * @param route 
   * @param state 
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.routeParams = route.params;
    return this.getLeads();
  }

  /**
   * Get all the agent's leads
   */
  getLeads() {
    return new Promise((resolve, reject) => {
      this.leads = [
        {id: 1, name: "Lead One", email: "leadone@email.com", phone: "+60111111111", status: 1},
        {id: 1, name: "Lead Two", email: "leadtwo@email.com", phone: "+60122222222", status: 3},
        {id: 1, name: "Lead Three", email: "leadthree@email.com", phone: "+60133333333", status: 3},
      ];
      resolve(this.leads);
    });
  }

  deleteLead(leadId) {
    return {status: 'OK', description: "Lead has been deleted"};
  }
}
