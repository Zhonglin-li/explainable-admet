import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  public resData: any;
  constructor() { }
  set(key: string, value: any){
    sessionStorage.setItem(key, JSON.stringify(value));
  // localStorage.setItem(key, JSON.stringify(value));
  }
  get(key: string){
    return JSON.parse(sessionStorage.getItem(key));
    // return JSON.parse(localStorage.getItem(key));
  }
  remove(key: string){
    sessionStorage.removeItem(key);
    // localStorage.removeItem(key);
  }
  clear(){
    sessionStorage.clear();
  }
  setData(value: any){
    // this.resData.push(value);
    this.resData = value;
  }
  // getData(){
  //   return new Observable((observer)=>{
  //      observer.next(this.resData);
  //     //  observer.error('false');
  //      };
  //   })
  // }
  getData(){
    return this.resData;
  }
}
