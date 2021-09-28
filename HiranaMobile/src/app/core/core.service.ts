import { ServerData, ServerService } from 'ircore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  private ingressing = false;

  constructor(private serverSrv: ServerService) { }

  connect(srvData: ServerData) {
    this.serverSrv.connect(srvData);
    this.ingressing = true;
  }

  public isIngressing() {
    return this.ingressing;
  }

}
