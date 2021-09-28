import { environment } from './../environment';
import { Channel, ChannelsService } from 'ircore';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.page.html',
  styleUrls: ['./channel.page.scss'],
})
export class ChannelPage implements OnInit {

  public channelHash: string;
  public channel: Channel = new Channel('');

  constructor(private chanServ: ChannelsService) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.channelHash = window.location.hash;
    this.channel = this.chanServ.getChannel(environment.defaultServerID, new Channel(this.channelHash));
  }

}
