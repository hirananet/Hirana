import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullLoginPage } from './full-login.page';

const routes: Routes = [
  {
    path: '',
    component: FullLoginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FullLoginPageRoutingModule {}
