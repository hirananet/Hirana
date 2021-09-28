import { ChanServ, ChannelData } from './channels.service';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.page.html',
  styleUrls: ['./channels.page.scss'],
})
export class ChannelsPage implements OnInit {

  public channels: ChannelData[];
  public hasChannels: boolean = false;

  constructor(private readonly chanServ: ChanServ, public alertController: AlertController) { }

  ngOnInit() {
    this.channels = this.chanServ.getChannelList()
    this.hasChannels = this.channels.length > 0;
  }

  public leave(chan: string) {
    this.chanServ.leaveChannel(chan);
  }

  async addServer() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Nuevo canal',
      message: 'Agrega un canal por su nombre.',
      inputs: [
        {
          name: 'channelName',
          type: 'text',
          placeholder: '#main'
        },
      ],
      buttons: [{
        text: 'OK',
        handler: (d) => {
          if(d.channelName) {
            this.chanServ.joinChannel(d.channelName);
          } else {
            return false;
          }
        }
      }]
    });
    await alert.present();
  }

}
