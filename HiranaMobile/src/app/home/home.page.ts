import { Component } from '@angular/core';
import { ServerData, ServerService } from 'ircore';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private serverSrv: ServerService) {}

  connect() {
    const srvData = new ServerData();
    srvData.ircServer = 'irc.hirana.net';
    srvData.ircPort = 443;
    srvData.user.nick = 'Tst';
    srvData.user.altNick = 'Tst2';
    srvData.user.user = 'Alex';
    srvData.withWebSocket = true;
    srvData.withSSL = true;
    srvData.serverID = 'SRVID';
    this.serverSrv.connect(srvData);
  }

}
