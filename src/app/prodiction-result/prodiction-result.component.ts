import { Component, OnInit } from '@angular/core';
import {StorageService} from '../service/storage/storage.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';



@Component({
  selector: 'app-prodiction-result',
  templateUrl: './prodiction-result.component.html',
  styleUrls: ['./prodiction-result.component.css']
})
export class ProdictionResultComponent implements OnInit {
  public data: any;
  public historyList: any[] = [];
  public regressionList = [
    'LogS (Solubility)', 'LogP (Distribution Coefficient P)', 'LogD (Distribution Coefficient D at PH=7.4)', 'T 1/2 (Half Life)', 'CL (Clearance)', 'PPB (Plasma Protein Binding)'
  ];
  public list: any[] = [1];
  constructor(public http: HttpClient, public storage: StorageService, ){ }
  ngOnInit(): void {
    // console.log('oninit carry on');
    // get data from service:StorageService
    console.log(this.storage.getData().get('Property'));
    // define a various for accepting headers of http and access address
    const httpOptions = {headers: new HttpHeaders()};
    // application/json multipart/form-data {'content-type': 'application/json'}
    let api= 'http://192.168.1.135:8000/admet/prediction';
    if (this.storage.getData()){
      this.data = this.storage.getData();
      // use method set() of service:StorageService to implement local storage of data,and judge if the data exits or not
      if (this.historyList.indexOf(this.data) === -1){
        this.historyList.push(this.data);
        this.storage.set('prodictionParama', this.historyList);
      }
    }
    // when user can not get a data, he can use the last local storage;usually happend when we reload the page
    else{
      this.historyList = this.storage.get('prodictionParama');
      this.data = this.historyList[this.historyList.length - 1 ];
    }
    // send request of post and get data from backstage
    this.http.post(api, this.data, httpOptions).subscribe((response)=>{
      console.log(response);
      // this.storage.setData({Property: this.inputData.Property});
      // this.storage.setData( response[0]);
      // console.log(this.storage.getData());
    });

  }
  // ngAfterContentInit(): void{
  //   let data = this.storage.getData();
  //   this.list.push(data);
  //   console.log(this.list);
  //   console.log(data);
  //   console.log('content carry on')
  // }

}
