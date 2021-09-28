import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IngressPage } from './ingress.page';

const routes: Routes = [
  {
    path: '',
    component: IngressPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IngressPageRoutingModule {}
