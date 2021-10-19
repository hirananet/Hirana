import { LinkVcardComponent } from './link-vcard/link-vcard.component';
import { SafePipe } from './safe.pipe';
import { ParserComponent } from './parser.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    ParserComponent,
    SafePipe,
    LinkVcardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ParserComponent
  ]
})
export class ParserModule { }
