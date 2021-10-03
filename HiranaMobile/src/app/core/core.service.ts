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
    this.ingressed = true;
  }

  public isIngressed() {
    return this.ingressed;
  }

}
