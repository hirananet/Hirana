import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IngressPageRoutingModule } from './ingress-routing.module';

import { IngressPage } from './ingress.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IngressPageRoutingModule
  ],
  declarations: [IngressPage]
})
export class IngressPageModule {}
