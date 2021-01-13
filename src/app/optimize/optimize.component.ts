import { Component, OnInit, ViewChild } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {StorageService} from '../service/storage/storage.service';
import {environment} from '../../environments/environment';
@Component({
  selector: 'app-optimize',
  templateUrl: './optimize.component.html',
  styleUrls: ['./optimize.component.css']
})
export class OptimizeComponent implements OnInit {

  public validation = '';
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
  }
  postData(){
    ($('#loadingModal')as any).modal('show');
    const formdata = new FormData();
    formdata.append('smiles', this.optimizeData.Smiles);
    formdata.append('cutoff', this.choice.threshold);
    formdata.append('dbname', this.choice.db);
    const httpOptions = {headers: new HttpHeaders(), withCredentails: true};
    const api = this.restHost + '/explainable-admet/optimization';
    this.http.post(api, formdata, httpOptions).subscribe((response: any) => {
      // console.log(response);
      this.storage.setData(response);
      this.router.navigateByUrl('/explainable-admet/optimization/result');
      ($('#loadingModal')as any).modal('hide');
    },
    (error: any) => {
      // console.log(error.error);
      ($('#loadingModal')as any).modal('hide');
      if (error.error.msg){
        this.validation = error.error.msg;
      }
      else{
        this.validation = 'Server Not Found ';
      }
      ($('#validationModal')as any).modal('show');
    }
    );
  }

}
