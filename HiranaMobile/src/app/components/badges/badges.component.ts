import { Component, Input, OnInit } from '@angular/core';
import { UModes } from 'ircore';

@Component({
  selector: 'app-badges',
  templateUrl: './badges.component.html',
  styleUrls: ['./badges.component.scss'],
})
export class BadgesComponent implements OnInit {

  @Input() channelModes;

  public isOperator: boolean;
  public isFounder: boolean;
  public isAdmin: boolean;
  public isHalfop: boolean;
  public isVoiced: boolean;
  public isBanned: boolean;

  constructor() { }

  ngOnInit() {
    this.isFounder = this.channelModes.findIndex(mode => mode === UModes.FOUNDER) >= 0;
    this.isAdmin = this.channelModes.findIndex(mode => mode === UModes.ADMIN) >= 0;
    this.isOperator = this.channelModes.findIndex(mode => mode === UModes.OPER) >= 0;
    this.isHalfop = this.channelModes.findIndex(mode => mode === UModes.HALFOPER) >= 0;
    this.isVoiced = this.channelModes.findIndex(mode => mode === UModes.VOICE) >= 0;
  }

}
