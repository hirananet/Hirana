import { ParserModule } from './../core/parser/parser.module';
import { TranslateModule } from '@ngx-translate/core';
import { BadgesModule } from './../components/badges/badges.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChannelPageRoutingModule } from './channel-routing.module';

import { ChannelPage } from './channel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChannelPageRoutingModule,
    BadgesModule,
    TranslateModule.forChild({
      extend: true
    }),
    ParserModule
  ],
  declarations: [ChannelPage]
})
export class ChannelPageModule {}
