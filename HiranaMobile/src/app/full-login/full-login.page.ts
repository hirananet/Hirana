import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-full-login',
  templateUrl: './full-login.page.html',
  styleUrls: ['./full-login.page.scss'],
})
export class FullLoginPage implements OnInit {

  public serverHost: string;
  public serverPort: number;
  public withSSL: boolean;
  public withWebSocket: boolean;
  public ircGateway: string;
  public ircGatewayPort: string;

  public nick: string;
  public altNick: string;
  public withBouncer: boolean;
  public user: string;
  public password: string;

  constructor() { }

  ngOnInit() {
  }

}
