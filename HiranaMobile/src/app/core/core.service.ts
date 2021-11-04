import { LoadingController } from '@ionic/angular';
import { ServerData, ServerService, NoticesService, PrivsService, ChannelsService } from 'ircore';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PushNotifications, Token } from '@capacitor/push-notifications';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  private ingressed = false;
  private serverName = '';
  private lastConnectionServer: ServerData;
  private reconnecting = true;

  constructor(private serverSrv: ServerService,
              private noticeSrv: NoticesService,
              private privSrv: PrivsService,
              private chnlSrv: ChannelsService,
              private loadingController: LoadingController) {
    this.noticeSrv.notifications.subscribe(d => {
      if(d.type == 'motd') {
        this.serverName = d.raw.partials[0];
      }
    });
    this.privSrv.enableAutoSave();
    this.chnlSrv.enableAutoSave();
    PushNotifications.addListener(
      'registration',
      (token: Token) => {
        this.serverSrv.sendToServer(environment.defaultServerID, `PUSH ${token.value}`);
      }
    );
    // PushNotifications.addListener(
    //   'pushNotificationActionPerformed',
    //   async (notification: ActionPerformed) => {
    //     const data = notification.notification.data;
    //     console.log('Action performed: ' + JSON.stringify(notification.notification));
    //     if (data.detailsId) {
    //       this.router.navigateByUrl(`/home/${data.detailsId}`);
    //     }
    //   }
    // );
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'connecting...'
    });
    await loading.present();
  }

  getServerData(serverID: string): ServerData {
    return this.serverSrv.getServerById(serverID);
  }

  getServerName() {
    return this.serverName;
  }

  reconnect() {
    this.serverSrv.reconnect(environment.defaultServerID);
  }

  setReconnectingStatus() {
    this.reconnecting = true;
    this.presentLoading();
  }

  isReconnecting(){
    return this.reconnecting;
  }

  connect(srvData?: ServerData) {
    if(srvData) {
      this.lastConnectionServer = srvData;
    } else {
      srvData = this.lastConnectionServer;
    }
    this.serverSrv.connect(srvData);
    if(srvData.user.password) {
      const subscript = this.noticeSrv.notifications.subscribe(d => {
        this.reconnecting = false;
        this.loadingController.dismiss();
        if(d.type == 'require-pass') {
          this.serverSrv.serverPass(srvData.serverID, srvData.user.user, srvData.user.password);
          if(srvData.hncBouncered) {
            // Register notification push
            setTimeout(() => {
              PushNotifications.requestPermissions().then((premission) => {
                if(premission.receive == 'granted') {
                  PushNotifications.register();
                }
              });
            }, 1000);
          }
          if(!srvData.user.identify) {
            subscript.unsubscribe();
          }
        }
        if(d.type == 'motd' && srvData.user.identify) {
          this.serverSrv.identify(srvData.serverID, srvData.user.password);
          subscript.unsubscribe();
        }
      });
    }
    this.ingressed = true;
  }

  public isIngressed() {
    return this.ingressed;
  }

  public setConnection(srvData: ServerData) {
    this.lastConnectionServer = srvData
    this.ingressed = true;
  }

  public getLastConnection() {
    return this.lastConnectionServer;
  }

}
