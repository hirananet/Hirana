import { CoreService } from './../core/core.service';
import { ChannelsService } from 'ircore';
import { PrivService } from './privs/privs.service';
import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  public tabletMode: boolean = false;
  public server: string = 'hirana.net';

  constructor(private readonly privSrv: PrivService,
              private readonly chanServ: ChannelsService,
              private readonly navCtrl: NavController,
              private readonly platform: Platform,
              private readonly core: CoreService) { }

  ngOnInit() {
    this.tabletMode = this.platform.is('tablet') || this.platform.is('ipad');
    this.server = this.core.getServerName();
  }

  openConfig() {
    this.navCtrl.navigateForward('/configs')
  }

}
