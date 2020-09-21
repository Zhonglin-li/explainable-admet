import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LitemolComponent} from './litemol/litemol.component';

@NgModule({
  declarations: [
    LitemolComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LitemolComponent
  ]
})
export class LitemolModule { }
