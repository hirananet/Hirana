import { PrivsService, PrivChat } from 'ircore';
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
              private route: ActivatedRoute) { }

  ionViewWillEnter(){
    this.privName = this.route.snapshot.paramMap.get('privName');
    this.chat = this.privSrv.getChat(environment.defaultServerID, this.privName);
  }

  ngOnInit() {
  }

  kp(evt) {

  }

}
