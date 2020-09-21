import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {JsmeComponent} from './jsme/jsme.component';

@NgModule({
  declarations: [JsmeComponent],
  imports: [
    CommonModule
  ],
  exports: [JsmeComponent]
})
export class JsmeModule { }
