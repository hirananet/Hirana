import { ChanServ } from './../channels/channels.service';
import { Component, OnInit } from '@angular/core';
import { ServerService, ListService, ChannelListData } from 'ircore';
import { environment } from 'src/app/environment';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  public loading = true;
  public channels: ChannelListData[];

  constructor(private readonly listSrv: ListService,
              private readonly serverSrv: ServerService,
              private readonly chanServ: ChanServ,
              private readonly navCtrl: NavController,
              private readonly toastController: ToastController) { }

  ngOnInit() {
    this.serverSrv.requestChannelList(environment.defaultServerID);
    this.initialLoad();
  }

  initialLoad() {
    this.loading = true;
    this.serverSrv.requestChannelList(environment.defaultServerID);
    const subscription = this.listSrv.notifications.subscribe(notification => {
      if(notification.type == 'end-list') {
        this.loading = false;
        this.channels = notification.parsedObject;
        subscription.unsubscribe();
      }
    });
  }

  async join(channel: ChannelListData) {
    this.chanServ.joinChannel(channel.channelHash);
    const toast = await this.toastController.create({
      message: `Canal agregado ${channel.channelHash}`,
      duration: 2000,
      color: 'success'
    });
    toast.present();
    this.navCtrl.navigateBack(`/tabs/channels`);
  }

  doRefresh(event) {
    const subscription = this.listSrv.notifications.subscribe(notification => {
      if(notification.type == 'end-list') {
        event.target.complete();
        subscription.unsubscribe();
      }
    });
  }

}
