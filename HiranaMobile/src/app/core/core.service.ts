import { ServerData, ServerService, NoticesService } from 'ircore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  private ingressed = false;
  private serverName = '';

  constructor(private serverSrv: ServerService, private noticeSrv: NoticesService) {
    this.noticeSrv.notifications.subscribe(d => {
      if(d.type == 'motd') {
        this.serverName = d.raw.partials[0];
      }
    })
  }

  getServerName() {
    return this.serverName;
  }

  connect(srvData: ServerData) {
    this.serverSrv.connect(srvData);
    if(srvData.user.password) {
      const subscript = this.noticeSrv.notifications.subscribe(d => {
        if(d.type == 'require-pass') {
          this.serverSrv.serverPass(srvData.serverID, srvData.user.user, srvData.user.password);
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

}
