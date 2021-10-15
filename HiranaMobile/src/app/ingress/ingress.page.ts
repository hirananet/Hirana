import { CoreService } from './../core/core.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConnectionStatus, NoticesService, RawMessage } from 'ircore';
import { Subscription } from 'rxjs';
import { NavController, ToastController } from '@ionic/angular';
import { environment } from '../environment';

@Component({
  selector: 'app-ingress',
  templateUrl: './ingress.page.html',
  styleUrls: ['./ingress.page.scss'],
})
export class IngressPage implements OnInit, OnDestroy {

  public messages: RawMessage[] = [];
  private notySub: Subscription;
  public fullData = false;

  constructor(private readonly notySrv: NoticesService,
              private readonly coreSrv: CoreService,
              private readonly navCtrl: NavController,
              private readonly toastController: ToastController) { }

  ngOnInit() {
    this.notySub = this.notySrv.notifications.subscribe(d => {
      this.messages.push(d.raw);
      if(d.type == 'endMotd') {
        setTimeout(() => {
          this.navCtrl.navigateRoot('/tabs');
        }, 300);
      }
    });
    this.coreSrv.getServerData(environment.defaultServerID).websocket.onStatusChanged().subscribe(status => {
      if(status.status == ConnectionStatus.ERROR) {
        // console.log(status.data.err, status.data.err.toString());
      }
      if(status.status == ConnectionStatus.DISCONNECTED) {
        console.error(status);
        this.presentError(`${status.data.reason} [${status.data.code}] retrying in 5sec`);
      }
    });
    if(!this.coreSrv.isIngressed()) {
      this.navCtrl.navigateRoot('/login');
      return;
    }
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

}
