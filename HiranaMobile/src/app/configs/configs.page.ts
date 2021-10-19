import { TranslateService } from '@ngx-translate/core';
import { CoreService } from './../core/core.service';
import { ServerService } from 'ircore';
import { Component, OnInit } from '@angular/core';
import { environment } from '../environment';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-configs',
  templateUrl: './configs.page.html',
  styleUrls: ['./configs.page.scss'],
})
export class ConfigsPage implements OnInit {

  public nick: string;
  public serverName: string;

  constructor(private readonly srvSrv: ServerService,
              private readonly cSrv: CoreService,
              private readonly alertCtrl: AlertController,
              private readonly translateSrv: TranslateService) { }

  ionViewWillEnter(){
    this.nick = this.srvSrv.getCurrentNick(environment.defaultServerID);
    this.serverName = this.cSrv.getServerName();
  }

  ngOnInit() {
  }

  loadImageFromDevice(evt) {

  }

  openPopupFile() {
    document.getElementById('file-input').click();
  }

  async logout() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: this.translateSrv.instant('CONFIGS.LOGOUT'),
      message: this.translateSrv.instant('CONFIGS.LOGOUT_D'),
      buttons: [this.translateSrv.instant('CANCEL'), {text: this.translateSrv.instant('OK'), handler: () => {
        localStorage.removeItem('hm_connection');
        window.location.reload();
      }}]
    });
    await alert.present();
  }

  async wipe() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: this.translateSrv.instant('CONFIGS.WIPE'),
      message: this.translateSrv.instant('CONFIGS.WIPE_D'),
      buttons: [this.translateSrv.instant('CANCEL'), {text: this.translateSrv.instant('OK'), handler: () => {
        localStorage.removeItem('hm_connection');
        localStorage.removeItem('hm_channels');
        localStorage.removeItem('hm_privs');
        localStorage.removeItem('hm_lastNick');
        this.srvSrv.databaseWipe(environment.defaultServerID);
        window.location.reload();
      }}]
    });
    await alert.present();
  }
}
