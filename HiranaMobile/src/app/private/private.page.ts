import { PrivService } from './../tabs/privs/privs.service';
import { PrivsService, PrivChat, ChannelsService, ServerService } from 'ircore';
import { Component, OnInit } from '@angular/core';
import { environment } from '../environment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-private',
  templateUrl: './private.page.html',
  styleUrls: ['./private.page.scss'],
})
export class PrivatePage implements OnInit {

  public message: string;
  public privName: string;
  public chat: PrivChat;

  constructor(private readonly privSrv: PrivsService,
              private readonly localPrivSrv: PrivService,
              private readonly srvSrv: ServerService,
              private route: ActivatedRoute) { }

  ionViewWillEnter(){
    this.privName = this.route.snapshot.paramMap.get('privName');
    this.chat = this.privSrv.getChat(environment.defaultServerID, this.privName);
    this.localPrivSrv.setInPriv(this.privName);
  }

  ionViewWillLeave(){
    this.localPrivSrv.setInPriv('');
  }

  ngOnInit() {
  }

  kp(evt) {
    if(evt.charCode==13) {
      this.srvSrv.sendPrivMSG(environment.defaultServerID, this.privName, this.message);
      this.message = '';
    }
  }

}
