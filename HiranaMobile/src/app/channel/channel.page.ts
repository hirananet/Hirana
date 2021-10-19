import { Subscription } from 'rxjs';
import { ChanServ } from './../tabs/channels/channels.service';
import { environment } from './../environment';
import { Channel, ChannelsService, ServerService } from 'ircore';
import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.page.html',
  styleUrls: ['./channel.page.scss'],
})
export class ChannelPage implements OnInit {

  public channelHash: string;
  public channel: Channel = new Channel('');
  public message: string;

  private subsc: Subscription;
  private scrollLocked: boolean;
  private autoScroll: boolean;
  public newMessagesWithoutRead: boolean;

  constructor(private chanServ: ChannelsService,
              private localChanSrv: ChanServ,
              private serverSrv: ServerService,
              private navCtrl: NavController,
              private route: ActivatedRoute,
              private menu: MenuController) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.channelHash = '#' + this.route.snapshot.paramMap.get('chanName');
    this.channel = this.chanServ.getChannel(environment.defaultServerID, new Channel(this.channelHash));
    this.localChanSrv.setInChannel(this.route.snapshot.paramMap.get('chanName'));
    this.subsc = this.chanServ.notifications.subscribe(d => {
      if(d.type == 'message' && d.parsedObject.channel == this.channel.name) {
        this.scrollToBottom();
      }
    });
    this.scrollToBottom();
  }


  scrollToBottom() {
    setTimeout(() => {
      if(this.scrollLocked) {
        this.newMessagesWithoutRead = true; // not in the end
        return;
      }
      this._scrollToBottom();
    }, 100);
  }

  _scrollToBottom() {
    this.newMessagesWithoutRead = false; // in the end
    this.autoScroll = true;
    this.scrollLocked = false;
    const element = document.getElementById('list-msg');
    const height = element.scrollHeight;
    element.scrollTo(0, height);
  }

  onScroll(evt) {
    if(this.autoScroll) {
      this.autoScroll = false;
      return;
    }
    const realTopScroll = evt.target.scrollTop + evt.target.clientHeight;
    const scrollSize = evt.target.scrollHeight - 50;
    if(realTopScroll >= scrollSize) { // in the end
      this.scrollLocked = false;
      this.newMessagesWithoutRead = false;
    } else {
      this.scrollLocked = true;
    }
  }

  ionViewWillLeave(){
    this.localChanSrv.setInChannel('');
    this.subsc.unsubscribe();
  }

  openPriv(nick: string) {
    this.navCtrl.navigateForward(`/private/${nick}`)
  }

  kp(evt) {
    if(evt.charCode==13 && this.message && this.message.trim().length > 0) {
      this.serverSrv.sendChannelMSG(environment.defaultServerID, this.channelHash, this.message);
      this.message = '';
      setTimeout(() => {
        this._scrollToBottom();
      }, 100);
    }
  }

  async openUsers() {
    this.menu.toggle('users');
  }

}
