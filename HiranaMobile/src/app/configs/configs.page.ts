import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-configs',
  templateUrl: './configs.page.html',
  styleUrls: ['./configs.page.scss'],
})
export class ConfigsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  loadImageFromDevice(evt) {

  }

  openPopupFile() {
    document.getElementById('file-input').click();
  }

}
