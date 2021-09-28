import { ServerData, ServerService } from 'ircore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  private ingressed = false;

  constructor(private serverSrv: ServerService) { }

  connect(srvData: ServerData) {
    this.serverSrv.connect(srvData);
    this.ingressed = true;
  }

  public isIngressed() {
    return this.ingressed;
  }

}
