import { TranslateService } from '@ngx-translate/core';
import { CoreService } from './../core/core.service';
import { Component, HostListener, OnInit } from '@angular/core';
import { ServerData } from 'ircore';
import { NavController, ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

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
              private readonly toastController: ToastController,
              private readonly translateSrv: TranslateService) { }

  ngOnInit() {
    this.nick = localStorage.getItem('hm_lastNick');
    this.nick2 = this.nick;
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
      this.presentError(this.translateSrv.instant('LOGIN.E_NICK'));
      return;
    }
    const srvData = new ServerData();
    srvData.ircServer = 'irc.hirana.net';
    srvData.ircPort = 443;
    srvData.user.nick = this.nick;
    srvData.user.altNick = this.nick+'_';
    srvData.user.user = this.nick;
    srvData.withWebSocket = true;
    srvData.withSSL = true;
    srvData.serverID = environment.defaultServerID;
    localStorage.setItem('hm_lastNick', srvData.user.nick);
    this.saveConnection(srvData);
    this.doConnection(srvData);
  }

  passwordLogin() {
    if(!this.nick2 || this.nick2.length < 3) {
      this.presentError(this.translateSrv.instant('LOGIN.E_NICK'));
      return;
    }
    if(!this.password || this.password.length < 3) {
      this.presentError(this.translateSrv.instant('LOGIN.E_PASSWORD'));
      return;
    }
    const srvData = new ServerData();
    if(environment.production) {
      srvData.ircServer = 'hnc.hirana.net';
      srvData.ircPort = 443;
      srvData.withSSL = true;
    } else {
      srvData.ircServer = 'localhost';
      srvData.ircPort = 7000;
      srvData.withSSL = false;
    }
    srvData.user.nick = this.nick2;
    srvData.user.altNick = this.nick2+'_';
    srvData.user.user = this.nick2;
    srvData.user.password = this.password;
    srvData.user.identify = true;
    srvData.withWebSocket = true;
    srvData.serverID = environment.defaultServerID;
    srvData.hncBouncered = true;
    localStorage.setItem('hm_lastNick', srvData.user.nick);
    this.saveConnection(srvData);
    this.doConnection(srvData);
  }

  fullLogin() {
    this.navCtrl.navigateForward('/full-login');
  }

  doConnection(srvData) {
    this.coreSrv.setConnection(srvData);
    this.navCtrl.navigateRoot('/ingress');
  }

  saveConnection(srvData: ServerData) {
    localStorage.setItem('hm_connection', JSON.stringify(srvData));
  }
}
