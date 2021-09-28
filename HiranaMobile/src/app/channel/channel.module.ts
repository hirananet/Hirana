import { UsersPage } from './users/users.page';
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
    ChannelPageRoutingModule
  ],
  declarations: [ChannelPage, UsersPage]
})
export class ChannelPageModule {}
