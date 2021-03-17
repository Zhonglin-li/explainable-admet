import {Injectable, NgZone} from '@angular/core';
import {Subject} from 'rxjs';
import {Observable} from 'rxjs';


declare const JSApplet: any;

@Injectable({
  providedIn: 'root'
})
export class GlobalService {


  // jsme
  JSMEApplet$ = new Subject<any>();

  constructor(private zone: NgZone) {
    this.zone.runOutsideAngular(() => {
      window['jsmeOnLoad'] = () => {
        console.log('JSME init');
        this.JSMEApplet$.next(JSApplet);
      };
    });
  }

  private _globalLoading = new Subject<boolean>();
  loadingStatus$ = this._globalLoading.asObservable();
  private _nextStep = new Subject<number>();
  nextStepValue$ = this._nextStep.asObservable();
  

  setNextStepValue(value: number) {
    this._nextStep.next(value);
  }

  setLoading(status: boolean): void {
    this._globalLoading.next(status);
  }

  getRxjsData(){
    return new Observable((observer)=>{
      // 异步方法(()=>{let 变量 observer.next(变量); 失败的数据observer.error()})
    });
  }
}
