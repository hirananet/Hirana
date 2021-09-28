import { CoreService } from './../core/core.service';
import { Component, OnInit } from '@angular/core';
import { ServerData } from 'ircore';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public nick: string = 'IRCoreV3';

  constructor(private readonly coreSrv: CoreService, private readonly navCtrl: NavController) { }

  ngOnInit() {
  }

  simpleLogin() {
    const srvData = new ServerData();
    srvData.ircServer = 'magikus.hirana.net';
    srvData.ircPort = 80;
    srvData.user.nick = this.nick;
    srvData.user.altNick = this.nick+'_';
    srvData.withWebSocket = true;
    srvData.withSSL = false;
    srvData.serverID = 'SRVID';
    this.coreSrv.connect(srvData);
    this.navCtrl.navigateRoot('/ingress');
  }
}
