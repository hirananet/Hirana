import { CustomEmoteList } from './../../core/parser/CustomEmoteList';
import { Channel, ChannelsService, ServerService } from 'ircore';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChanServ {

  private channelList: ChannelData[];
  private inChannel: string;

  constructor(private chanServ: ChannelsService, private servSrv: ServerService) {
    chanServ.notifications.subscribe(d => {
      if(d.type == 'new-channel') {
        const chnl: Channel = d.parsedObject.channel;
        if(!this.channelList.find(chanData => chanData.name == chnl.name)) {
          const chanData = new ChannelData();
          chanData.name = chnl.name;
          chanData.hash = chnl.hashedName;
          chanData.notifications = 0;
          this.channelList.push(chanData);
        }
        this.saveChannels();
      }
      if(d.type == 'close-channel') {
        const chnl: Channel = d.parsedObject.channel;
        const idx = this.channelList.findIndex(chanData => chanData.name == chnl.name);
        if(idx >= 0) {
          this.channelList.splice(idx, 1);
        }
        this.saveChannels();
      }
      if(d.type == 'message') {
        // new message in channel
        CustomEmoteList.effectChecker(d.parsedObject.content, d.parsedObject.author);
        if(d.parsedObject.channel != this.inChannel) {
          this.channelList.find(chnl => chnl.name == d.parsedObject.channel).notifications++;
        }
      }
    });
  }

  public getChannelList(): ChannelData[] {
    if(!this.channelList) {
      this.channelList = this.loadOldChannels();
    }
    return this.channelList;
  }

  public leaveChannel(channel: string) {
    this.servSrv.leave(environment.defaultServerID, channel);
  }

  public joinChannel(channel: string) {
    this.servSrv.join(environment.defaultServerID, channel);
  }

  private loadOldChannels(): ChannelData[] {
    const channels: ChannelData[] = JSON.parse(localStorage.getItem('hm_channels'));
    if(channels) {
      channels.forEach((channel: ChannelData) => {
        this.joinChannel(channel.hash);
      });
      return channels;
    }
    return [];
  }

  private saveChannels(): void {
    localStorage.setItem('hm_channels', JSON.stringify(this.channelList))
  }

  public setInChannel(channelName: string) {
    this.inChannel = channelName;
    if(channelName) {
      const chan = this.channelList.find(chnl => chnl.name == channelName);
      if(chan) {
        chan.notifications = 0;
      }
    }
  }

}

export class ChannelData {
  name: string;
  hash: string;
  notifications: number = 0;
}
