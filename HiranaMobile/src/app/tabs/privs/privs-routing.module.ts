import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrivsPage } from './privs.page';

const routes: Routes = [
  {
    path: '',
    component: PrivsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivsPageRoutingModule {}
