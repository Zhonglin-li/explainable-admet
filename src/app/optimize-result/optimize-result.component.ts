import { Component, OnInit, ViewChild} from '@angular/core';
import {JsmeComponent} from '../jsme/jsme/jsme.component';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {StorageService} from '../service/storage/storage.service';
import {environment} from '../../environments/environment';


@Component({
  selector: 'app-optimize-result',
  templateUrl: './optimize-result.component.html',
  styleUrls: ['./optimize-result.component.css']
})
export class OptimizeResultComponent implements OnInit {
  @ViewChild(JsmeComponent) jsme: JsmeComponent;

  public optimizeError = '';
  public preError = '';
  public prebool = false;
  public historyList: any[] = [];
  // public result: any = 'OC([C@H](C1=CC=C(CC(C)C)C=C1)C)=O';
  public result: any;
  // public preresult: any;
  public demo = true;
  private restHost = environment.REST_HOST;

  public optimizeData: any = {
    Smiles: '',
  };
  public choice: any = {
    threshold: 2.5,
    thresholds: [1.5, 2.5, 3.5],
    db: 'logbcf',
    dbs: [
      'logbcf', 'logs', 'logd', 'logvd', 'logvp', 'ppb', 'pyriformis', 'CYP1a2',
      'CYP2c9', 'CYP2c19', 'CYP2d6', 'CYP3a4'
    ],
  };

  constructor(private http: HttpClient, private router: Router, public storage: StorageService, ) { }

  ngOnInit(): void {
    $(function(): void{
      $('#optimizeTable').DataTable( {
        dom: 'iptl',
        ordering: false,
        processing: true,
      } );
    });
    if (this.storage.getData()){
      this.result = this.storage.getData();
      // console.log(this.result);
      // use method set() of service:StorageService to implement session storage of data,and judge if the data exits or not
      if (this.historyList.indexOf(this.result) === -1){
        this.result[1].score = String(this.result[1].score * 100);
        this.historyList.push(this.result);
        this.storage.remove('optimizationParama');
        this.storage.set('optimizationParama', this.historyList);
      }
    }
    else if (this.storage.get('optimizationParama')){
      this.historyList = this.storage.get('optimizationParama');
      this.result = this.historyList[this.historyList.length - 1 ];
    }
    else{
      this.router.navigateByUrl('/explainable-admet/optimization');
    }
    this.choice.db = this.result[1].dbname;
    this.choice.threshold = this.result[1].cutoff;
  }
  postData(){
    this.prebool = false;
    ($('#loadingModal')as any).modal('show');
    this.optimizeData.Smiles = this.jsme.smiles;
    const formdata = new FormData();
    formdata.append('smiles', this.optimizeData.Smiles);
    formdata.append('cutoff', this.choice.threshold);
    formdata.append('dbname', this.choice.db);
    const httpOptions = {headers: new HttpHeaders(), withCredentails: true};
    const api = this.restHost + '/explainable-admet/optimization';
    this.http.post(api, formdata, httpOptions).subscribe((response: any) => {
      // console.log(response);
      this.result = response;
      if (this.historyList.indexOf(this.result) === -1){
        this.result[1].score = String(this.result[1].score * 100);
        this.historyList = [];
        this.historyList.push(this.result);
        this.storage.remove('optimizationParama');
        this.storage.set('optimizationParama', this.historyList);
        window.location.reload();
      }
      ($('#loadingModal')as any).modal('hide');
    },
    (error: any) => {
      // console.log(error.error);
      if (error.error.msg){
        this.optimizeError = error.error.msg;
      }
      else{
        this.optimizeError = 'Server Not Found ';
      }
      ($('#loadingModal')as any).modal('hide');
      ($('#optimizationModal')as any).modal('show');
    }
    );

  }
  predicting(index = null){
    const formdata = new FormData();
    ($('#loadingModal')as any).modal('show');
    if (index === null){
      formdata.append('smiles', this.result[1].smiles);
    }
    else{
      formdata.append('smiles', this.result[0][index].smiles);
    }
    const httpOptions = {headers: new HttpHeaders(), withCredentails: true};
    const api = this.restHost + '/explainable-admet/prediction';
    this.http.post(api, formdata, httpOptions).subscribe((response: any) => {
      // console.log(response);
      this.storage.setData(response);
      ($('#loadingModal')as any).modal('hide');
      this.router.navigateByUrl('/explainable-admet/prediction/result');
    },
    (error: any) => {
      // console.log(error.error);
      if (error.error.msg){
        this.preError = error.error.msg;
      }
      else{
        this.preError = 'Server Not Found ';
      }
      ($('#loadingModal')as any).modal('hide');
      ($('#preModal')as any).modal('show');
    }
    );
  }
  Download(file: string){
    const datas = {
      filename : file
    };
    const downName = file + '.csv';
    const link = document.createElement('a');
    const api = this.restHost + '/explainable-admet/downloadfile';
    this.http.get(api, {params: datas, responseType: 'blob'}).subscribe((response: any ) => {
      // console.log(response);
      link.setAttribute('href', window.URL.createObjectURL(response));
      link.setAttribute('download', downName);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    });
  }
}
