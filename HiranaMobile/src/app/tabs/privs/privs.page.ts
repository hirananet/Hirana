import { ServerService, PrivsService, NoticesService } from 'ircore';
import { TranslateService } from '@ngx-translate/core';
import { PrivService, PrivChatData } from './privs.service';
import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-privs',
  templateUrl: './privs.page.html',
  styleUrls: ['./privs.page.scss'],
})
export class PrivsPage implements OnInit {

  public privs: PrivChatData[] = [];

  constructor(private readonly privSrv: PrivService,
              private readonly basePrivSrv: PrivsService,
              private readonly baseNoticeSrv: NoticesService,
              private readonly srvSrv: ServerService,
              private readonly navCtrl: NavController,
              private readonly alertController: AlertController,
              private readonly translateSrv: TranslateService,
              private readonly loadingController: LoadingController) { }

  ngOnInit() {
    this.privs = this.privSrv.getPrivs().sort((a,b) => b.lastDateMessage - a.lastDateMessage);
  }

  openChat(chat: string) {
    this.navCtrl.navigateForward(`/private/${chat}`)
  }

  removeChat(chat: string) {
    this.privSrv.removePriv(chat);
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
    });
    await loading.present();
    return loading;
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
            this.presentLoading().then(loader => {
              const pSub = this.basePrivSrv.notifications.subscribe(d => {
                if(d.type == 'non-existant') {
                  loader.dismiss();
                  pSub.unsubscribe();
                  nSub.unsubscribe();
                  this.alertController.create({
                    cssClass: 'my-custom-class',
                    header: 'Oops',
                    message: this.translateSrv.instant('PRIVATES.NICK_NOT_EXISTS'),
                    buttons: ['OK']
                  }).then(alert => {alert.present(); });
                }
              });
              const nSub = this.baseNoticeSrv.notifications.subscribe(d => {
                if(d.type == 'whois-start') {
                  loader.dismiss();
                  this.openChat(d.raw.partials[3]);
                  pSub.unsubscribe();
                  nSub.unsubscribe();
                }
              });
              this.srvSrv.whois(environment.defaultServerID, d.nickName);
            });
          } else {
            return false;
          }
        }
      }]
    });
    await alert.present();
  }

}
