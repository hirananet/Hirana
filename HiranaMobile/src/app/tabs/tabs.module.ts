import { ChannelsPageModule } from './channels/channels.module';
import { PrivsPageModule } from './privs/privs.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsPageRoutingModule,
    TranslateModule.forChild({
      extend: true
    }),
    PrivsPageModule,
    ChannelsPageModule
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
