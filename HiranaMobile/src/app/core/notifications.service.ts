import { Injectable } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  private notificationNumber: number = 0;

  constructor() { }

  public sendNotification(title: string, message: string) {
    LocalNotifications.schedule({
      notifications: [
        {
          id: this.notificationNumber,
          title: title,
          body: message,
        }
      ]
    });
    this.notificationNumber++;
  }
}
