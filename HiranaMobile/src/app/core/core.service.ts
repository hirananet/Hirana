import { ServerData, ServerService, NoticesService, PrivsService, ChannelsService } from 'ircore';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  private ingressed = false;
  private serverName = '';
  private lastConnectionServer: ServerData;

  constructor(private serverSrv: ServerService,
              private noticeSrv: NoticesService,
              private privSrv: PrivsService,
              private chnlSrv: ChannelsService) {
    this.noticeSrv.notifications.subscribe(d => {
      if(d.type == 'motd') {
        this.serverName = d.raw.partials[0];
      }
    });
    this.privSrv.enableAutoSave();
    this.chnlSrv.enableAutoSave();
  }

  getServerData(serverID: string): ServerData {
    return this.serverSrv.getServerById(serverID);
  }

  getServerName() {
    return this.serverName;
  }

  reconnect() {
    this.serverSrv.reconnect(environment.defaultServerID);
  }

  connect(srvData?: ServerData) {
    if(srvData) {
      this.lastConnectionServer = srvData;
    } else {
      srvData = this.lastConnectionServer;
    }
    this.serverSrv.connect(srvData);
    if(srvData.user.password) {
      const subscript = this.noticeSrv.notifications.subscribe(d => {
        if(d.type == 'require-pass') {
          this.serverSrv.serverPass(srvData.serverID, srvData.user.user, srvData.user.password);
          if(srvData.hncBouncered) {
            // Register notification push
            setTimeout(() => {
              this.serverSrv.sendToServer(srvData.serverID, "PUSH <token here>")
            }, 1000);
          }
          if(!srvData.user.identify) {
            subscript.unsubscribe();
          }
        }
        if(d.type == 'motd' && srvData.user.identify) {
          this.serverSrv.identify(srvData.serverID, srvData.user.password);
          subscript.unsubscribe();
        }
      });
    }
    this.ingressed = true;
  }

  public isIngressed() {
    return this.ingressed;
  }

  public setConnection(srvData: ServerData) {
    this.lastConnectionServer = srvData
    this.ingressed = true;
  }

  public getLastConnection() {
    return this.lastConnectionServer;
  }

}
