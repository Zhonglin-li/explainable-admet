import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  public resData: any;
  constructor() { }
  
  set(key: string, value: any){
  localStorage.setItem(key, JSON.stringify(value));
  }
  get(key: string){
    return JSON.parse(localStorage.getItem(key));
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
