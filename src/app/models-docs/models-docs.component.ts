import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, NavigationEnd} from '@angular/router';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-models-docs',
  templateUrl: './models-docs.component.html',
  styleUrls: ['./models-docs.component.css']
})
export class ModelsDocsComponent implements OnInit {
  subscribeScoll: any;
  scrollDis: any = {
    _top: 0
  };

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe(s => {
      if (s instanceof NavigationEnd) {
        const tree = this.router.parseUrl(this.router.url);
        if (tree.fragment) {
          const element = document.querySelector('#' + tree.fragment);
          if (element) { element.scrollIntoView(); }
        }
      }
    });
    // subscribe scroll event
    this.subscribeScoll = fromEvent(window, 'scroll')
      .subscribe((event) => {
        this.onWindowScroll();
    });
  }
  // ngAfterViewInit() {
  //   this.ngScroll();
  // }
  // ngOnDestroy() {
  //   this.rmScroll();
  // }
  // 解决锚点与路由匹配冲突的点击函数，上面的初始化函数是为了解决再次进入此页面没有效果的问题
  onAnchorClick(){
    this.route.fragment.subscribe ((f) => {
      const element = document.querySelector ( '#' + f );
      if ( element ){element.scrollIntoView(); }
    });
  }
  scollPostion() {
    var t, l, w, h;
    if (document.documentElement && document.documentElement.scrollTop) {
        t = document.documentElement.scrollTop;
        l = document.documentElement.scrollLeft;
        w = document.documentElement.scrollWidth;
        h = document.documentElement.scrollHeight;
    } else if (document.body) {
        t = document.body.scrollTop;
        l = document.body.scrollLeft;
        w = document.body.scrollWidth;
        h = document.body.scrollHeight;
    }
    return {
        top: t,
        left: l,
        width: w,
        height: h
    };
  }
  onWindowScroll(){
    this.scrollDis._top = this.scollPostion().top;
    $('#list-example').css('margin-top', this.scrollDis._top);
    // if (this.scrollDis._top > 300){
    //   $('#b2').removeClass('hide');
    // }else{
    //   $('#b2').addClass('hide');
    // }
  }
  // returnTop(){
  //   $(window).scrollTop(0);
  // }

}
