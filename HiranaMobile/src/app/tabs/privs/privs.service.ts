import { PrivsService } from 'ircore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PrivService {

  private privList: PrivChatData[] = [];

  constructor(private readonly privSrv: PrivsService) {
    privSrv.notifications.subscribe(r => {
      if(r.type === 'new-priv') {
        this.privList.push(new PrivChatData(r.parsedObject.chatName));
      }
      if(r.type === 'message') {
        const chat = this.getChat(r.parsedObject.author);
        if(chat) {
          chat.newMessage(r.parsedObject.content);
        }
      }
    });
  }

  public getChat(name: string) {
    return this.privList.find(r => r.name == name);
  }

  public getPrivs() {
    return this.privList;
  }

}

export class PrivChatData {
  public name: string;
  public lastDateMessage: number;
  public lastMessage: string;

  constructor(name: string) {
    this.name = name;
    this.lastDateMessage = (new Date()).getTime();
  }

  public newMessage(message: string) {
    this.lastMessage = message;
    this.lastDateMessage = (new Date()).getTime();
  }

}
