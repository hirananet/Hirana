import { environment } from '../environment';
import { CoreService } from './../core/core.service';
import { Component, HostListener, OnInit } from '@angular/core';
import { ServerData } from 'ircore';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public nick: string;

  public nick2: string;
  public password: string;

  public landscape: boolean;

  constructor(private readonly coreSrv: CoreService,
              private readonly navCtrl: NavController,
              public toastController: ToastController) { }

  ngOnInit() {
    const lastConnection = JSON.parse(localStorage.getItem('hm_connection'));
    this.nick = localStorage.getItem('hm_lastNick');
    this.nick2 = this.nick;
    if(lastConnection) {
      this.doConnection(lastConnection);
    }
    this.landscape = window.innerWidth > window.innerHeight;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.landscape = event.target.innerWidth > event.target.innerHeight;
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
    srvData.ircServer = 'irc.hirana.net';
    srvData.ircPort = 443;
    srvData.user.nick = this.nick;
    srvData.user.altNick = this.nick+'_';
    srvData.withWebSocket = true;
    srvData.withSSL = true;
    srvData.serverID = environment.defaultServerID;
    localStorage.setItem('hm_lastNick', srvData.user.nick);
    this.saveConnection(srvData);
    this.doConnection(srvData);
  }

  passwordLogin() {
    if(!this.nick2 || this.nick2.length < 3) {
      this.presentError('Debe ingresar un nick de al menos 3 caracteres');
      return;
    }
    if(!this.password || this.password.length < 3) {
      this.presentError('Debe ingresar una password de al menos 3 caracteres');
      return;
    }
  }

  fullLogin() {
    this.navCtrl.navigateForward('/full-login');
  }

  doConnection(srvData) {
    this.coreSrv.connect(srvData);
    this.navCtrl.navigateRoot('/ingress');
  }

  saveConnection(srvData: ServerData) {
    localStorage.setItem('hm_connection', JSON.stringify(srvData));
  }
}
