import { Channel } from 'ircore';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {

  @Input() channel: Channel;

  constructor(private readonly modalCtrl: ModalController, private navCtrl: NavController) { }

  ngOnInit() {
  }

  dismissModal() {
    this.modalCtrl.dismiss();
  }

  openPriv(nick: string) {
    this.modalCtrl.dismiss();
    this.navCtrl.navigateForward(`/private#${nick}`)
  }

}
