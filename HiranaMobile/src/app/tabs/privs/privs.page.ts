import { PrivService, PrivChatData } from './privs.service';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-privs',
  templateUrl: './privs.page.html',
  styleUrls: ['./privs.page.scss'],
})
export class PrivsPage implements OnInit {

  public privs: PrivChatData[] = [];

  constructor(private readonly privSrv: PrivService, private navCtrl: NavController) { }

  ngOnInit() {
    this.privs = this.privSrv.getPrivs();
  }

  openChat(chat: string) {
    this.navCtrl.navigateForward(`/private/${chat}`)
  }

  removeChat(chat: string) {

  }

}
