import { TranslateService } from '@ngx-translate/core';
import { PrivService, PrivChatData } from './privs.service';
import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { environment } from 'src/app/environment';

@Component({
  selector: 'app-privs',
  templateUrl: './privs.page.html',
  styleUrls: ['./privs.page.scss'],
})
export class PrivsPage implements OnInit {

  public privs: PrivChatData[] = [];

  constructor(private readonly privSrv: PrivService,
              private navCtrl: NavController,
              public alertController: AlertController,
              private translateSrv: TranslateService) { }

  ngOnInit() {
    this.privs = this.privSrv.getPrivs();
  }

  openChat(chat: string) {
    this.navCtrl.navigateForward(`/private/${chat}`)
  }

  removeChat(chat: string) {
    this.privSrv.removePriv(chat);
  }

  async newPriv() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: this.translateSrv.instant('PRIVATES.OPEN'),
      message: this.translateSrv.instant('PRIVATES.OPEN_D'),
      inputs: [
        {
          name: 'nickName',
          type: 'text',
          placeholder: 'Alex'
        },
      ],
      buttons: [this.translateSrv.instant('CANCEL'), {
        text: this.translateSrv.instant('OK'),
        handler: (d) => {
          if(d.nickName) {
            this.openChat(d.nickName);
          } else {
            return false;
          }
        }
      }]
    });
    await alert.present();
  }

}
