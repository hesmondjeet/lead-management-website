import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

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
      
      let params = new HttpParams();
      params = params.set('agent_id', this.agentId.toString());

      this.http.get(environment.server + "/leads", {params})
      .toPromise()
      .then(response => {
        this.leads = response['leads'];
        resolve(this.leads);
      });
    });
  }

  deleteLead(leadId) {
    return this.http.delete(environment.server + `/leads/${leadId}`).toPromise();
  }
}
