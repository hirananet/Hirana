import { CustomEmoteList } from './CustomEmoteList';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-parser',
  templateUrl: './parser.component.html',
  styleUrls: ['./parser.component.scss'],
})
export class ParserComponent implements OnInit {

  @Input() message: string;
  @Input() author: string;
  @Input() preloaded: boolean;

  parsed: string;
  ytVideos: string[] = [];
  links: string[] = [];
  images: string[] = [];

  constructor() { }

  ngOnInit() {

    this.parsed = this.message;
    let ytlink;
    do {
      ytlink = /((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?/.exec(this.parsed);
      if(ytlink) {
        this.parsed = this.parsed.replace(ytlink[0], '');
        this.ytVideos.push(ytlink[5]);
      }
    } while(ytlink);

    let image;
    do {
      image = /(http(s?):)([\/|.|\w|\s|-])*\.(?:jpg|gif|png|jpeg)/.exec(this.parsed);
      if(image) {
        this.parsed = this.parsed.replace(image[0], '');
        this.images.push(image[0]);
      }
    } while(image);

    let link = null;
    do {
      link = /(http|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-;]*[\w@?^=%&\/~+#-])?/gm.exec(this.parsed);
      if(link) {
        this.parsed = this.parsed.replace(link[0], '');
        this.links.push(link[0]);
      }
    } while(link);

    // prevent XSS:
    const temp = document.createElement('div');
    temp.textContent = this.parsed;
    this.parsed = temp.innerHTML;
    // end of xss prevention
    this.parsed = CustomEmoteList.parseEmotes(this.parsed, this.author, this.preloaded);

  }

}
