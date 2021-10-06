import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfigsPageRoutingModule } from './configs-routing.module';

import { ConfigsPage } from './configs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfigsPageRoutingModule,
    TranslateModule.forChild({
      extend: true
    })
  ],
  declarations: [ConfigsPage]
})
export class ConfigsPageModule {}
