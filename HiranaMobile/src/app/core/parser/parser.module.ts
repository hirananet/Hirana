import { SafePipe } from './safe.pipe';
import { ParserComponent } from './parser.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    ParserComponent,
    SafePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ParserComponent
  ]
})
export class ParserModule { }
