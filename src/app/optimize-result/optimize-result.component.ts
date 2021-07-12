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
    threshold: 1,
    longThreshold: 9,
    thresholds: [1, 2, 3],
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
      this.router.navigateByUrl('/InterpretableAdmet/optimization');
    }
    this.choice.db = this.result[1].dbname;
    if (this.choice.db1.indexOf(this.choice.db) === -1){
      this.choice.longThreshold = this.result[1].cutoff;
    }
    else{
      this.choice.threshold = this.result[1].cutoff;
    }
  }
  postData(){
    this.prebool = false;
    ($('#loadingModal')as any).modal('show');
    this.optimizeData.Smiles = this.jsme.smiles;
    const formdata = new FormData();
    formdata.append('smiles', this.optimizeData.Smiles);
    if (this.choice.db1.indexOf(this.choice.db) === -1){
      this.choice.threshold = this.choice.longThreshold;
    }
    formdata.append('cutoff', this.choice.threshold);
    formdata.append('dbname', this.choice.db);
    const httpOptions = {headers: new HttpHeaders(), withCredentails: true};
    const api = this.restHost + '/InterpretableAdmet/optimization';
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
    const api = this.restHost + '/InterpretableAdmet/prediction';
    this.http.post(api, formdata, httpOptions).subscribe((response: any) => {
      // console.log(response);
      this.storage.setData(response);
      ($('#loadingModal')as any).modal('hide');
      this.router.navigateByUrl('/InterpretableAdmet/prediction/result');
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
    const api = this.restHost + '/InterpretableAdmet/optimization/downloadfile';
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
