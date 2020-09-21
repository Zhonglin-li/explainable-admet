import { Component,ViewChild,OnInit} from '@angular/core';
// import {JsmeComponent} from '../app/jsme/jsme/jsme.component';
import {Router} from '@angular/router';
// 引入服务
import {GlobalService} from './service/global/global.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'admePro';
 
 
  // constructor(private globalService: GlobalService) {
  //   this.globalService.loadingStatus$
  //     .subscribe(status => {
  //       this.loadingStatus = status;
  //     });
  // }
  constructor(private router: Router,
    private globalService: 
    GlobalService,) {

  }
  
  ngOnInit(){
    // this.jsmeSmiles = 'CNCC(O)c1ccc(OC(=O)C(C)(C)C)c(OC(=O)C(C)(C)C)c1';
  }

}
  // jsmeApplet = new JSApplet.JSME("jsme_container", "380px", "340px");

