import { Injectable } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  private notificationNumber: number = 0;

  constructor(private readonly navCtrl: NavController) {
    LocalNotifications.addListener('localNotificationActionPerformed', (payload) => {
      console.log('Notification: ', payload);
      if(payload.notification.extra.isPrivate) {
        this.navCtrl.navigateForward(`/private/${payload.notification.extra.chat}`)
      } else {

      }
    });
  }

  public sendNotification(title: string, message: string, extras) {
    LocalNotifications.schedule({
      notifications: [
        {
          id: this.notificationNumber,
          title: title,
          body: message,
          extra: extras
        }
      ]
    });
    this.notificationNumber++;
  }
}
