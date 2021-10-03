import { ChannelsService } from 'ircore';
import { PrivService } from './privs/privs.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  constructor(private readonly privSrv: PrivService, private readonly chanServ: ChannelsService) { }

  ngOnInit() {
  }

}
