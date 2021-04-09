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
  // public longChoice: any = {
  //   threshold: 9,
  //   thresholds: [9, 8, 7],
  //   db: 'LD50',
  //   dbs: [
  //      'pyriformis', 'logs', 'CYP2c19', 'logd', 'LD50'
  //   ],
  // };
  public choice: any = {
    threshold: 3,
    longThreshold: 9,
    thresholds: [3, 2, 1],
    longThresholds: [9, 8, 7],
    db: 'logvd',
    dbs: [
      'logbcf', 'logvd', 'ppb', 'CYP1a2', 'CYP2c9',  'CYP2d6', 'CYP3a4', 'logvp',
      'pyriformis', 'logs', 'CYP2c19', 'logd', 'LD50'
    ],
    db1: ['logbcf', 'logvd', 'ppb', 'CYP1a2', 'CYP2c9',  'CYP2d6', 'CYP3a4', ],
    db2: ['pyriformis', 'logs', 'CYP2c19', 'logd', 'LD50', 'logvp'],
  };

  constructor(private http: HttpClient, private router: Router, public storage: StorageService, ) { }

  ngOnInit(): void {
  }
  postData(){
    ($('#loadingModal')as any).modal('show');
    const formdata = new FormData();
    formdata.append('smiles', this.optimizeData.Smiles);
    if (this.choice.db1.indexOf(this.choice.db) === -1){
      this.choice.threshold = this.choice.longThreshold;
    }
    // console.log(this.choice.threshold);
    formdata.append('cutoff', this.choice.threshold);
    formdata.append('dbname', this.choice.db);
    const httpOptions = {headers: new HttpHeaders(), withCredentails: true};
    const api = this.restHost + '/InterpretableAdmet/optimization';
    this.http.post(api, formdata, httpOptions).subscribe((response: any) => {
      // console.log(response);
      this.storage.setData(response);
      this.router.navigateByUrl('/InterpretableAdmet/optimization/result');
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
