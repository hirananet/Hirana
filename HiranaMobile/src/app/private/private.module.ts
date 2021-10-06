import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrivatePageRoutingModule } from './private-routing.module';

import { PrivatePage } from './private.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrivatePageRoutingModule,
    TranslateModule.forChild({
      extend: true
    })
  ],
  declarations: [PrivatePage]
})
export class PrivatePageModule {}
