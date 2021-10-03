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

  constructor(private srvSrv: ServerService, private cSrv: CoreService, private alertCtrl: AlertController) { }

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
      header: 'Wipe',
      message: 'Esto eliminará la configuración y te desconectará.',
      buttons: ['Cancel', {text: 'Ok', handler: () => {
        localStorage.removeItem('hm_connection');
        window.location.reload();
      }}]
    });
    await alert.present();
  }

  async wipe() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Wipe',
      message: 'Esto eliminará la configuración, los mensajes, los canales, etc.',
      buttons: ['Cancel', {text: 'Ok', handler: () => {
        localStorage.removeItem('hm_connection');
        localStorage.removeItem('hm_channels');
        localStorage.removeItem('hm_privs');
        localStorage.removeItem('hm_lastNick');
        window.location.reload();
      }}]
    });
    await alert.present();
  }
}
