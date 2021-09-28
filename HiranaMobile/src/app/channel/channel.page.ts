import { environment } from './../environment';
import { Channel, ChannelsService, ServerService } from 'ircore';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.page.html',
  styleUrls: ['./channel.page.scss'],
})
export class ChannelPage implements OnInit {

  public channelHash: string;
  public channel: Channel = new Channel('');
  public message: string;

  constructor(private chanServ: ChannelsService, private serverSrv: ServerService) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.channelHash = window.location.hash;
    this.channel = this.chanServ.getChannel(environment.defaultServerID, new Channel(this.channelHash));
  }

  kp(evt) {
    if(evt.charCode==13) {
      this.serverSrv.sendTo(environment.defaultServerID, this.channelHash, this.message);
      this.message = '';
    }
  }

}
