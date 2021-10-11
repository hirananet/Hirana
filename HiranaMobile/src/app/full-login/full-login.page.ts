import { TranslateService } from '@ngx-translate/core';
import { CoreService } from './../core/core.service';
import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { ServerData, User } from 'ircore';
import { environment } from '../environment';

@Component({
  selector: 'app-full-login',
  templateUrl: './full-login.page.html',
  styleUrls: ['./full-login.page.scss'],
})
export class FullLoginPage implements OnInit {

  public serverHost: string = 'irc.hirana.net';
  public serverPort: number = 443;
  public withSSL: boolean = true;
  public withWebSocket: boolean = true;
  public ircGateway: string = 'wss://wircg.tandilserver.com/webirc/websocket/';
  public ircGatewayPort: number = 443;

  public nick: string;
  public altNick: string;
  public identify: boolean = false;
  public user: string;
  public password: string;

  constructor(private readonly coreSrv: CoreService,
              private readonly navCtrl: NavController,
              private readonly toastController: ToastController,
              private readonly translateSrv: TranslateService) { }

  ngOnInit() {
  }

  async presentError(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: 'danger'
    });
    toast.present();
  }

  connect() {
    if(!this.nick || this.nick.length < 3) {
      this.presentError(this.translateSrv.instant('LOGIN.E_NICK'));
      return;
    }
    if(!this.altNick || this.altNick.length < 3 || this.altNick == this.nick) {
      this.presentError(this.translateSrv.instant('LOGIN.E_ALTNICK'));
      return;
    }
    const srvData = new ServerData();
    srvData.serverID = environment.defaultServerID;
    srvData.ircServer = this.serverHost;
    srvData.ircPort = this.serverPort;
    srvData.withWebSocket = this.withWebSocket;
    srvData.withSSL = this.withSSL;
    srvData.gatewayPort = this.ircGatewayPort;
    srvData.gatewayServer = this.ircGateway;
    srvData.user = new User();
    srvData.user.nick = this.nick;
    srvData.user.altNick = this.altNick;
    srvData.user.password = this.password;
    srvData.user.user = this.user;
    srvData.user.identify = this.identify;
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
