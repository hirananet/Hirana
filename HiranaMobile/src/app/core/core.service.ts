import { LoadingController } from '@ionic/angular';
import { ServerData, ServerService, NoticesService, PrivsService, ChannelsService } from 'ircore';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PushNotifications, Token } from '@capacitor/push-notifications';
import { FCM } from "@capacitor-community/fcm";
import { Capacitor } from '@capacitor/core';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  private ingressed = false;
  private serverName = '';
  private lastConnectionServer: ServerData;
  private reconnecting = true;
  private passwordSubscriptor: Subscription;

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
        if(Capacitor.getPlatform() == 'ios') { // in this case the token is an APNs token and we need firebase token.
          FCM.getToken()
          .then((fcmToken) => {
            console.log('FCMToken', fcmToken.token);
            this.serverSrv.sendToServer(environment.defaultServerID, `PUSH ${fcmToken.token}`);
          }).catch(e => {
            console.log(e);
          });
        } else {
          this.serverSrv.sendToServer(environment.defaultServerID, `PUSH ${token.value}`);
        }
      }
    );
  }

  async presentLoading() {
    if(this.reconnecting) {
      return;
    }
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
    const srvData = this.serverSrv.reconnect(environment.defaultServerID);
    console.log('Subscribin for passord ', srvData);
    if (this.passwordSubscriptor) {
      this.passwordSubscriptor.unsubscribe();
      this.passwordSubscriptor = undefined;
    }
    this.subscribeForLogin(srvData);
  }

  setReconnectingStatus() {
    this.presentLoading();
    this.reconnecting = true;
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
    this.subscribeForLogin(srvData);
    this.ingressed = true;
  }

  private subscribeForLogin(srvData) {
    if(srvData.user.password) {
      this.passwordSubscriptor = this.noticeSrv.notifications.subscribe(d => {
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
            this.passwordSubscriptor.unsubscribe();
            this.passwordSubscriptor = undefined;
          }
        }
        if(d.type == 'motd' && srvData.user.identify) {
          this.serverSrv.identify(srvData.serverID, srvData.user.password);
          this.passwordSubscriptor.unsubscribe();
          this.passwordSubscriptor = undefined;
        }
      });
    }
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
