import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path        : 'leads',
    loadChildren: './main/leads/leads.module#LeadsModule'
  },
  {
    path        : '',
    redirectTo  : 'leads',
    pathMatch   : 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
