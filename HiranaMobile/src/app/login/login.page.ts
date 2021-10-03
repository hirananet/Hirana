import { environment } from '../environment';
import { CoreService } from './../core/core.service';
import { Component, OnInit } from '@angular/core';
import { ServerData } from 'ircore';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public nick: string;

  constructor(private readonly coreSrv: CoreService, private readonly navCtrl: NavController, public toastController: ToastController) { }

  ngOnInit() {
    const lastConnection = JSON.parse(localStorage.getItem('hm_connection'));
    this.nick = localStorage.getItem('hm_lastNick');
    if(lastConnection) {
      this.doConnection(lastConnection);
    }
  }

  async presentError(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: 'danger'
    });
    toast.present();
  }

  simpleLogin() {
    if(!this.nick || this.nick.length < 3) {
      this.presentError('Debe ingresar un nick de al menos 3 caracteres');
      return;
    }
    const srvData = new ServerData();
    srvData.ircServer = 'magikus.hirana.net';
    srvData.ircPort = 80;
    srvData.user.nick = this.nick;
    srvData.user.altNick = this.nick+'_';
    srvData.withWebSocket = true;
    srvData.withSSL = false;
    srvData.serverID = environment.defaultServerID;
    localStorage.setItem('hm_lastNick', srvData.user.nick);
    this.saveConnection(srvData);
    this.doConnection(srvData);
  }

  doConnection(srvData) {
    this.coreSrv.connect(srvData);
    this.navCtrl.navigateRoot('/ingress');
  }

  saveConnection(srvData: ServerData) {
    localStorage.setItem('hm_connection', JSON.stringify(srvData));
  }
}
