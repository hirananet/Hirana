import { Subscription } from 'rxjs';
import { PrivService } from './../tabs/privs/privs.service';
import { PrivsService, PrivChat, ServerService } from 'ircore';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-private',
  templateUrl: './private.page.html',
  styleUrls: ['./private.page.scss'],
})
export class PrivatePage implements OnInit {

  public message: string;
  public privName: string;
  public chat: PrivChat;

  private subsc: Subscription;
  private scrollLocked: boolean;
  private autoScroll: boolean;
  public newMessagesWithoutRead: boolean;

  constructor(private readonly privSrv: PrivsService,
              private readonly localPrivSrv: PrivService,
              private readonly srvSrv: ServerService,
              private route: ActivatedRoute) { }

  ionViewWillEnter(){
    this.privName = this.route.snapshot.paramMap.get('privName');
    this.chat = this.privSrv.getChat(environment.defaultServerID, this.privName);
    this.localPrivSrv.setInPriv(this.privName);
    this.subsc = this.privSrv.notifications.subscribe(d => {
      if(d.type == 'message' && d.parsedObject.author == this.privName) {
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
    this.localPrivSrv.setInPriv('');
    this.subsc.unsubscribe();
  }

  ngOnInit() {
  }

  kp(evt) {
    if(evt.charCode==13 && this.message && this.message.trim().length > 0) {
      this.srvSrv.sendPrivMSG(environment.defaultServerID, this.privName, this.message);
      this.message = '';
      setTimeout(() => {
        this._scrollToBottom();
      }, 100);
    }
  }

}
