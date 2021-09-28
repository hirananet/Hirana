import { CoreService } from './../core/core.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NoticesService, RawMessage } from 'ircore';
import { Subscription } from 'rxjs';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-ingress',
  templateUrl: './ingress.page.html',
  styleUrls: ['./ingress.page.scss'],
})
export class IngressPage implements OnInit, OnDestroy {

  public messages: RawMessage[] = [];
  private notySub: Subscription;
  public fullData = false;

  constructor(private readonly notySrv: NoticesService, private readonly coreSrv: CoreService, private readonly navCtrl: NavController) { }

  ngOnInit() {
    this.notySub = this.notySrv.notifications.subscribe(d => {
      this.messages.push(d.raw);
      if(d.type == 'endMotd') {
        setTimeout(() => {
          this.navCtrl.navigateRoot('/tabs');
        }, 300);
      }
    });
    if(!this.coreSrv.isIngressing()) {
      this.navCtrl.navigateRoot('/login');
      return;
    }
  }

  ngOnDestroy(): void {
    this.notySub.unsubscribe();
  }

}
