import { PrivsService } from 'ircore';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environment';

@Injectable({
  providedIn: 'root'
})
export class PrivService {

  private privList: PrivChatData[] = [];
  private inPrivate: string;

  constructor(private readonly privSrv: PrivsService) {
    this.loadPrivs();
    privSrv.notifications.subscribe(r => {
      if(r.type === 'new-priv') {
        if(!this.privList.find(p => p.name == r.parsedObject.chatName)) {
          this.privList.push(new PrivChatData(r.parsedObject.chatName));
          this.saveChannels();
        }
      }
      if(r.type === 'message') {
        const chat = this.getChat(r.parsedObject.author);
        if(chat) {
          chat.newMessage(r.parsedObject.content, r.parsedObject.author == this.inPrivate);
        }
      }
    });
  }

  public setInPriv(name: string) {
    this.inPrivate = name;
    this.getChat(name).clearNotifications();
  }

  public getChat(name: string) {
    return this.privList.find(r => r.name == name);
  }

  public getPrivs() {
    return this.privList;
  }

  public saveChannels() {
    localStorage.setItem('hm_privs', JSON.stringify(this.privList));
  }

  public removePriv(chat: string) {
    const privIdx = this.privList.findIndex(r => r.name == chat);
    if(privIdx > -1) {
      this.privSrv.removePriv(environment.defaultServerID, chat);
      this.privList.splice(privIdx, 1);
    }
    this.saveChannels();
  }

  public loadPrivs() {
    const privs = JSON.parse(localStorage.getItem('hm_privs'));
    if(privs) {
      this.privList = privs;
    }
  }

}

export class PrivChatData {
  public name: string;
  public lastDateMessage: number;
  public lastMessage: string;
  public notifications: number = 0;

  constructor(name: string) {
    this.name = name;
    this.lastDateMessage = (new Date()).getTime();
  }

  public newMessage(message: string, isOpened: boolean) {
    this.lastMessage = message;
    this.lastDateMessage = (new Date()).getTime();
    if(!isOpened) {
      this.notifications++;
    }
  }

  public clearNotifications() {
    this.notifications = 0;
  }

}

