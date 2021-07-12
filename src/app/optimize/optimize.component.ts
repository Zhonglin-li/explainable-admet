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
  selectedValue = 'lucy';
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
    db: 'VDss',
    BasicProperty: ['Solubility', 'LogD', 'LogP', 'LogVP', 'LogBCF', 'BP', 'MP', 'Lipophilicity', 'Hydration free energy'],
    Absorption: ['HIA', 'Caco2 permeability', 'HOB', 'Pgp-substrate', 'Pgp-inhibitor'],
    Distribution: ['BBB', 'PPB', 'VDss'],
    Metabolism: ['BCRP', 'CYP1A2-inhibitor', 'CYP2C9-inhibitor', 'CYP2C9-substrate', 'CYP2C19-inhibitor', 'CYP2D6-inhibitor', 'CYP2D6-substrate', 'CYP3A4-inhibitor', 'CYP3A4-substrate', 'OATP1B3-inhibitor', 'OATP1B1-inhibitor', 'OCT2'],
     Excretion: ['LogT1/2'],
     Toxicity: ['AMES', 'Honey bee toxicity', 'Biodegradation', 'Carcinogenicity', 'DILI', 'Eye corrossion', 'Eye injury', 'FDAMDD', 'Fish toxicity', 'Genotoxicity', 'hERG', 'H-HT', 'Skin sensitization', 'Acute oral toxicity', 'LD50', 'Pyriformis toxicity'],
    dbs: [
      'Solubility', 'LogD', 'LogP', 'LogVP', 'LogBCF', 'BP', 'MP', 'Lipophilicity', 'Hydration free energy', 'HIA', 'Caco2 permeability', 'HOB', 'Pgp-substrate', 'Pgp-inhibitor', 'BBB', 'PPB', 'VDss', 'BCRP', 'CYP1A2-inhibitor', 'CYP2C9-inhibitor', 'CYP2C9-substrate', 'CYP2C19-inhibitor', 'CYP2D6-inhibitor', 'CYP2D6-substrate', 'CYP3A4-inhibitor', 'CYP3A4-substrate', 'OATP1B3-inhibitor', 'OATP1B1-inhibitor', 'OCT2', 'LogT1/2', 'AMES', 'Honey bee toxicity', 'Biodegradation', 'Carcinogenicity', 'DILI', 'Eye corrossion', 'Eye injury', 'FDAMDD', 'Fish toxicity', 'Genotoxicity', 'hERG', 'H-HT', 'Skin sensitization', 'Acute oral toxicity', 'LD50', 'Pyriformis toxicity'
    ],
    db1: ['LogBCF', 'VDss', 'PPB', 'CYP1A2-inhibitor', 'CYP2C9-inhibitor',  'CYP2D6-inhibitor', 'CYP3A4-inhibitor', 'BBB', 'BCRP', 'Honey bee toxicity', 'Biodegradation', 'Caco2 permeability', 'Carcinogenicity', 'CYP2C9-substrate', 'CYP2D6-substrate', 'CYP3A4-substrate', 'DILI', 'Eye corrossion', 'FDAMDD', 'Fish toxicity', 'Genotoxicity', 'hERG', 'H-HT', 'HIA',
    'Hydration free energy', 'Lipophilicity', 'LogT1/2', 'OATP1B1-inhibitor', 'OATP1B3-inhibitor',
    'HOB', 'OCT2', 'Pgp-inhibitor', 'Pgp-substrate', 'Skin sensitization'
  ],
    db2: ['Pyriformis toxicity', 'Solubility', 'CYP2C19-inhibitor', 'LogD', 'LD50', 'LogVP', 'Acute oral toxicity', 'AMES', 'BP', 'Eye injury', 'LogP', 'MP'],
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
