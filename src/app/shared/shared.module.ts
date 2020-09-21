import {NgModule, NgZone} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';

import {NgZorroAntdModule} from 'ng-zorro-antd';
import {LitemolModule} from './litemol/litemol.module';
import {JsmeModule} from './jsme/jsme.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    LitemolModule,
    JsmeModule,

  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LitemolModule,
    JsmeModule,
    NgZorroAntdModule,

  ],
  declarations: []
})
export class SharedModule { }
