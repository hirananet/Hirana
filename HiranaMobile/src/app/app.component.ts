import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(translateSrv: TranslateService) {
    let lang: any = navigator.language.split('-');
    lang = lang.length > 1 ? lang[0] : lang;
    // translateSrv.use(lang);
    console.log('Lang required', lang);
  }
}
