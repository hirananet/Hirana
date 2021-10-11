import { TranslateService } from '@ngx-translate/core';
import { ChanServ, ChannelData } from './channels.service';
import { Component, Input, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.page.html',
  styleUrls: ['./channels.page.scss'],
})
export class ChannelsPage implements OnInit {

  public channels: ChannelData[];
  @Input() showFavs: boolean = true;

  constructor(private readonly chanServ: ChanServ,
              public alertController: AlertController,
              private navCtrl: NavController,
              private translateSrv: TranslateService) { }

  ngOnInit() {
    this.channels = this.chanServ.getChannelList()
  }

  public openChannel(chan: string) {
    this.navCtrl.navigateForward(`/channel/${chan}`)
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
      header: this.translateSrv.instant('CHANNELS.NEW'),
      message: this.translateSrv.instant('CHANNELS.NEW_D'),
      inputs: [
        {
          name: 'channelName',
          type: 'text',
          placeholder: '#main'
        },
      ],
      buttons: [this.translateSrv.instant('CANCEL'), {
        text: this.translateSrv.instant('OK'),
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
