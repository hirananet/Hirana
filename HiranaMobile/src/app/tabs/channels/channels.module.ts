import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChannelsPageRoutingModule } from './channels-routing.module';

import { ChannelsPage } from './channels.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChannelsPageRoutingModule,
    TranslateModule.forChild({
      extend: true
    })
  ],
  declarations: [ChannelsPage]
})
export class ChannelsPageModule {}
