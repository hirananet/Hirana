import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FullLoginPageRoutingModule } from './full-login-routing.module';

import { FullLoginPage } from './full-login.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FullLoginPageRoutingModule,
    TranslateModule.forChild({
      extend: true
    })
  ],
  declarations: [FullLoginPage]
})
export class FullLoginPageModule {}
