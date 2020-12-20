import { Component, OnInit } from '@angular/core';
import {StorageService} from '../service/storage/storage.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';


@Component({
  selector: 'app-prodiction-result',
  templateUrl: './prodiction-result.component.html',
  styleUrls: ['./prodiction-result.component.css']
})
export class ProdictionResultComponent implements OnInit {
  // public data: any;
  public historyList: any[] = [];
  public result: any;
  public validation: any = '';
  constructor(public http: HttpClient, public storage: StorageService, public route: ActivatedRoute, private router: Router,){ }
  ngOnInit(): void {
    // console.log('oninit carry on');
    // get data from service:StorageService
    // console.log(this.storage.getData().get('smiles'));
    // define a various for accepting headers of http and access address
    // const httpOptions = {headers: new HttpHeaders()};
    // application/json multipart/form-data {'content-type': 'application/json'}
    // let api= 'http://192.168.1.135:8000/admetgcn/prediction';
    if (this.storage.getData()){
      this.result = this.storage.getData();
      // console.log(this.result);
      // use method set() of service:StorageService to implement local storage of data,and judge if the data exits or not
      if (this.historyList.indexOf(this.result) === -1){
        this.historyList.push(this.result);
        this.storage.set('prodictionParama', this.historyList);
      }
    }
    // when user can not get a data, he can use the last local storage;usually happend when we reload the page
    else{
      this.historyList = this.storage.get('prodictionParama');
      this.result = this.historyList[this.historyList.length - 1 ];
    }
    // send request of post and get data from backstage
    // this.http.post(api, this.data, httpOptions).subscribe((response)=>{
    //   console.log(response,typeof(response));
    //   this.result = response[0]
    //   // this.storage.setData({Property: this.inputData.Property});
    //   // this.storage.setData( response[0]);
    //   // console.log(this.storage.getData());
    // });
    // 获取动态路由传值
    // this.route.paramas.subscribe((data)=>{
    //   console.log(data)
    // })
    // console.log(this.result[0].img);
    console.log(this.result[0]["input_smiles"]);

  }
  opt(){
    const formdata = new FormData();
    ($('#loadingModal')as any).modal('show');
    formdata.append('smiles', this.result[0]["input_smiles"]);
    // console.log(this.inputData.Smiles);
    const httpOptions = {headers: new HttpHeaders(), withCredentails: true};
    let api = 'http://172.16.41.163:8000/admetgcn/optimize';
    this.http.post(api, formdata, httpOptions).subscribe((response: any) => {
      // console.log(response);
      this.storage.setData(response);
      this.router.navigateByUrl('/admetgcn/optimize/result');
      ($('#loadingModal')as any).modal('hide');
    },
    (error: any) => {
      // console.log(error.error);
      if (error.error.msg){
        this.validation = error.error.msg;
      }
      else{
        this.validation = 'Server Not Found ';
        // alert('server not found ');
      }
      ($('#loadingModal')as any).modal('hide');
      ($('#validationModal')as any).modal('show');
    }
    );
  }



}
