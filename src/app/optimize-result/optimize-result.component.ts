import { Component, OnInit, ViewChild} from '@angular/core';
import {JsmeComponent} from '../jsme/jsme/jsme.component';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {StorageService} from '../service/storage/storage.service';

@Component({
  selector: 'app-optimize-result',
  templateUrl: './optimize-result.component.html',
  styleUrls: ['./optimize-result.component.css']
})
export class OptimizeResultComponent implements OnInit {
  @ViewChild(JsmeComponent) jsme: JsmeComponent;

  public optimizeError = '';
  public historyList: any[] = [];
  public result: any = 'OC([C@H](C1=CC=C(CC(C)C)C=C1)C)=O';
  public demo = true;
  public optimizeData: any = {
    Smiles: '',
  };

  constructor(private http: HttpClient, private router: Router, public storage: StorageService, ) { }

  ngOnInit(): void {
    if (this.storage.getData()){
      this.result = this.storage.getData();
      // console.log(this.result);
      // use method set() of service:StorageService to implement local storage of data,and judge if the data exits or not
      if (this.historyList.indexOf(this.result) === -1){
        this.result[0].score = String(this.result[0].score * 100);
        this.historyList.push(this.result);
        this.storage.set('optimizationParama', this.historyList);
      }
    }
    else{
      this.historyList = this.storage.get('optimizationParama');
      this.result = this.historyList[this.historyList.length - 1 ];
    }

  }
  postData(){
    this.optimizeData.Smiles = this.jsme.smiles;
    const formdata = new FormData();
    formdata.append('smiles', this.optimizeData.Smiles);
    // console.log(this.inputData.Smiles);
    const httpOptions = {headers: new HttpHeaders(), withCredentails: true};
    let api = 'http://172.16.41.163:8000/admetgcn/optimize';
    this.http.post(api, formdata, httpOptions).subscribe((response: any) => {
      console.log(response);
      this.result = response;
      this.result[0].score = String(this.result[0].score * 100);
    },
    (error: any) => {
      // console.log(error.error);
      if (error.error.msg){
        this.optimizeError = error.error.msg;
      }
      else{
        this.optimizeError = 'Server Not Found ';
        // alert('server not found ');
      }
      ($('#optimizationModal')as any).modal('show');
    }
    );

  }
}
