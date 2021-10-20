import { CoreService } from './../core/core.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConnectionStatus, NoticesService, RawMessage } from 'ircore';
import { Subscription } from 'rxjs';
import { NavController, ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ingress',
  templateUrl: './ingress.page.html',
  styleUrls: ['./ingress.page.scss'],
})
export class IngressPage implements OnInit, OnDestroy {

  public messages: RawMessage[] = [];
  private notySub: Subscription;
  public fullData = false;

  public timeout: any;
  public cancelButton: boolean = false;

  constructor(private readonly notySrv: NoticesService,
              private readonly coreSrv: CoreService,
              private readonly navCtrl: NavController,
              private readonly toastController: ToastController,
              private readonly router: Router) { }

  ngOnInit() {
    this.notySub = this.notySrv.notifications.subscribe(d => {
      this.messages.push(d.raw);
      if(d.type == 'endMotd') {
        this.cancelButton = false;
        setTimeout(() => {
          this.navCtrl.navigateRoot('/tabs');
        }, 300);
      }
    });
    if(!this.coreSrv.isIngressed()) {
      this.navCtrl.navigateRoot('/login');
      return;
    }
    this.coreSrv.connect();
    this.coreSrv.getServerData(environment.defaultServerID).websocket.onStatusChanged().subscribe(status => {
      if(status.status == ConnectionStatus.ERROR) {
        // console.log(status.data.err, status.data.err.toString());
      }
      if(status.status == ConnectionStatus.DISCONNECTED) {
        // if(this.router.url != '/ingress') {
        //   console.log('Navigate to ingress');
        //   this.navCtrl.navigateRoot('/ingress')
        // }
        this.cancelButton = true;
        this.presentError(`${status.data.reason} [${status.data.code}] retrying in 5sec`);
        this.timeout = setTimeout(() => {
          console.log('Reconnect');
          this.coreSrv.getServerData(environment.defaultServerID).websocket.reconnect();
        }, 5000);
      }
    });
  }

  async presentError(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: 'danger'
    });
    toast.present();
  }

  ngOnDestroy(): void {
    this.notySub.unsubscribe();
  }

  cancelConnection() {
    clearTimeout(this.timeout);
    this.navCtrl.navigateRoot('/login');
  }

}
