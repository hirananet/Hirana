import { ChanServ, ChannelData } from './channels.service';
import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.page.html',
  styleUrls: ['./channels.page.scss'],
})
export class ChannelsPage implements OnInit {

  public channels: ChannelData[];

  constructor(private readonly chanServ: ChanServ, public alertController: AlertController, private navCtrl: NavController) { }

  ngOnInit() {
    this.channels = this.chanServ.getChannelList()
  }

  public openChannel(chan: string) {
    this.navCtrl.navigateForward(`/channel#${chan}`)
  }

  public leave(chan: string) {
    this.chanServ.leaveChannel(chan);
  }


  public debug() {
    console.log(this.channels);
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
