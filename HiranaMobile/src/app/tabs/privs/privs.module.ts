import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrivsPageRoutingModule } from './privs-routing.module';

import { PrivsPage } from './privs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrivsPageRoutingModule
  ],
  declarations: [PrivsPage]
})
export class PrivsPageModule {}
