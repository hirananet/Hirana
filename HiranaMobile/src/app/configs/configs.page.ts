import { TranslateService } from '@ngx-translate/core';
import { CoreService } from './../core/core.service';
import { ServerService, ServerData } from 'ircore';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

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

  changeNick() {
    this.srvSrv.setNick(environment.defaultServerID, this.nick);
    this.updateConnectionNick(this.nick);
    this.confirm(this.translateSrv.instant('CONFIGS.NICK_CHANGED'));
  }

  ngOnInit() {
  }

  updateConnectionNick(nick: string) {
    const lastConnection: ServerData = JSON.parse(localStorage.getItem('hm_connection'));
    lastConnection.user.nick = nick;
    localStorage.setItem('hm_lastNick', this.nick);
    localStorage.setItem('hm_connection', JSON.stringify(lastConnection));
  }

  loadImageFromDevice(evt) {

  }

  openPopupFile() {
    document.getElementById('file-input').click();
  }

  async confirm(message: string) {
    const alert = await this.alertCtrl.create({
      message: message,
      buttons: [this.translateSrv.instant('OK')]
    });
    await alert.present();
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
        this.srvSrv.sendToServer(environment.defaultServerID, 'HQUIT wipe');
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
