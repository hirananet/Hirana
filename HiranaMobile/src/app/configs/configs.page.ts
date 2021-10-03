import { CoreService } from './../core/core.service';
import { ServerService } from 'ircore';
import { Component, OnInit } from '@angular/core';
import { environment } from '../environment';

@Component({
  selector: 'app-configs',
  templateUrl: './configs.page.html',
  styleUrls: ['./configs.page.scss'],
})
export class ConfigsPage implements OnInit {

  public nick: string;
  public serverName: string;

  constructor(private srvSrv: ServerService, private cSrv: CoreService) { }

  ionViewWillEnter(){
    this.nick = this.srvSrv.getCurrentNick(environment.defaultServerID);
    this.serverName = this.cSrv.getServerName();
  }

  ngOnInit() {
  }

  loadImageFromDevice(evt) {

  }

  openPopupFile() {
    document.getElementById('file-input').click();
  }

  logout() {
    localStorage.removeItem('hm_connection');
    window.location.reload();
  }

}
