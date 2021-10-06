import { environment } from './../environment';
import { Channel, ChannelsService, ServerService } from 'ircore';
import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.page.html',
  styleUrls: ['./channel.page.scss'],
})
export class ChannelPage implements OnInit {

  public channelHash: string;
  public channel: Channel = new Channel('');
  public message: string;

  constructor(private chanServ: ChannelsService,
              private serverSrv: ServerService,
              private navCtrl: NavController,
              private route: ActivatedRoute,
              private menu: MenuController) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.channelHash = '#' + this.route.snapshot.paramMap.get('chanName');
    this.channel = this.chanServ.getChannel(environment.defaultServerID, new Channel(this.channelHash));
  }

  openPriv(nick: string) {
    this.navCtrl.navigateForward(`/private/${nick}`)
  }

  kp(evt) {
    if(evt.charCode==13) {
      this.serverSrv.sendChannelMSG(environment.defaultServerID, this.channelHash, this.message);
      this.message = '';
    }
  }

  async openUsers() {
    this.menu.toggle('users');
  }

}
