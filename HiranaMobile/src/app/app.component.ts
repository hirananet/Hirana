import { CoreService } from './core/core.service';
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(private readonly coreSrv: CoreService,
              private readonly navCtrl: NavController,
              translateSrv: TranslateService) {
    let lang: any = navigator.language.split('-');
    lang = lang.length > 1 ? lang[0] : lang;
    translateSrv.use(lang);
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    const lastConnection = JSON.parse(localStorage.getItem('hm_connection'));
    if(lastConnection) {
      this.coreSrv.setConnection(lastConnection);
      this.navCtrl.navigateRoot('/ingress');
    }
  }
}
