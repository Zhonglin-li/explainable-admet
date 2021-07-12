import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {StorageService} from '../service/storage/storage.service';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public validation = '';
  public searchError = '';
  public len: any;
  private restHost = environment.REST_HOST;
  public structureTypes = ['structure', 'substructure'];
  public structureType = this.structureTypes[0];
  public similarity: any = 0.5;
  public search: any = {
    mode: 'Range Property',
    modes: ['Range Property', 'Accurate Property', 'Similarity Property'],
  };
  public fingerprinter: any = {
    mode: 'MACCS',
    modes: ['MACCS', 'Morgan', 'RDKFingerprint'],
  };
  public inputData: any = {
    Smiles: '',
    leftMargin: '',
    rightMargin: '',
    rangeRadio: '',
    substructure: '',
  };

  public raSearch = {
    mode: 'PPB',
    BasicProperty: [
      'Solubility', 'LogD', 'LogP', 'LogVP', 'LogBCF', 'BP', 'MP', 'Lipophilicity', 'Hydration free energy'],
    Absorption: [
      'HIA', 'Caco2 permeability', 'HOB', 'Pgp-substrate', 'Pgp-inhibitor'],
    Distribution: ['BBB', 'PPB', 'VDss'],
    Metabolism: ['BCRP', 'CYP1A2-inhibitor', 'CYP2C9-inhibitor', 'CYP2C9-substrate', 'CYP2C19-inhibitor', 'CYP2D6-inhibitor', 'CYP2D6-substrate', 'CYP3A4-inhibitor', 'CYP3A4-substrate', 'OATP1B3-inhibitor', 'OATP1B1-inhibitor', 'OCT2'],
     Excretion: ['LogT1/2'],
     Toxicity: ['AMES', 'Honey bee toxicity', 'Biodegradation', 'Carcinogenicity', 'DILI', 'Eye corrossion', 'Eye injury', 'FDAMDD', 'Fish toxicity', 'Genotoxicity', 'hERG', 'H-HT', 'Skin sensitization', 'Acute oral toxicity', 'LD50', 'Pyriformis toxicity'],
    modes: ['Solubility', 'LogD', 'LogP', 'LogVP', 'LogBCF', 'BP', 'MP', 'Lipophilicity', 'Hydration free energy', 'HIA', 'Caco2 permeability', 'HOB', 'Pgp-substrate', 'Pgp-inhibitor', 'BBB', 'PPB', 'VDss', 'BCRP', 'CYP1A2-inhibitor', 'CYP2C9-inhibitor', 'CYP2C9-substrate', 'CYP2C19-inhibitor', 'CYP2D6-inhibitor', 'CYP2D6-substrate', 'CYP3A4-inhibitor', 'CYP3A4-substrate', 'OATP1B3-inhibitor', 'OATP1B1-inhibitor', 'OCT2', 'LogT1/2', 'AMES', 'Honey bee toxicity', 'Biodegradation', 'Carcinogenicity', 'DILI', 'Eye corrossion', 'Eye injury', 'FDAMDD', 'Fish toxicity', 'Genotoxicity', 'hERG', 'H-HT', 'Skin sensitization', 'Acute oral toxicity', 'LD50', 'Pyriformis toxicity'
    ]
  };
  public regression = [
    'Solubility', 'LogD', 'PPB', 'VDss',  'Acute oral toxicity', 'Pyriformis toxicity', 'BP', 'LogBCF', 'LogVP', 'MP', 'LogP', 'Hydration free energy', 'Lipophilicity', 'LD50',
  ];
  public classification = [
    'HIA', 'BBB', 'BCRP', 'OATP1B3-inhibitor', 'Pgp-inhibitor', 'CYP3A4-substrate', 'CYP2D6-substrate', 'CYP2C9-inhibitor',
     'CYP2D6-inhibitor', 'Carcinogenicity', 'Eye corrosion', 'AMES',
     'FDAMDD', 'Genotoxicity', 'Honey bee toxicity', 'Fish toxicity', 'Caco2 permeability', 'HOB', 'OATP1B1-inhibitor', 'OCT2', 'Pgp-substrate', 'CYP2C9-substrate', 'CYP3A4-inhibitor', 'CYP2C19-inhibitor', 'CYP1A2-inhibitor', 'DILI', 'Eye injury', 'H-HT', 'hERG', 'Skin sensitization', 'Biodegradation', 'LogT1/2'
  ];

  constructor(private http: HttpClient, private router: Router, public storage: StorageService, ) { }

  ngOnInit(): void {
  }
  postData(){
    const formdata = new FormData();
    // ($('#searchLoadingModal')as any).modal('show');
    formdata.append('smiles', this.inputData.Smiles);
    // console.log(this.inputData.Smiles);
    const httpOptions = {headers: new HttpHeaders()};
    const api = this.restHost + '/InterpretableAdmet/search/property';
    // send request of post and get data from backstage
    this.http.post(api, formdata, httpOptions).subscribe((response) => {
      // console.log(response);
      // console.log(response[0].validation);
      if (response[0].validation){
        this.validation = response[0].validation;
      }
      else{
        this.storage.setData(response);
        // setTimeout(() => this.router.navigateByUrl('/explainable-admet/search/propertyResult'), 2000);
        // ($('#searchLoadingModal')as any).modal('hide');
        // ($('#searchLoadingModal')as any).modal('dispose');
        this.router.navigateByUrl('/InterpretableAdmet/search/propertyResult');
        // console.log('close')
      }
    },
    (error: any) => {
      // console.log(error.error.msg);
      if (error.error.msg){
        this.searchError = error.error.msg;
      }
      else{
        this.searchError = 'Server Not Found ';
      }
      // ($('#searchLoadingModal')as any).modal('hide');
      ($('#searchModal')as any).modal('show');
    });
    // setTimeout(() => this.router.navigateByUrl('/explainable-admet/search/result'), 1500);
  }
  postRangeData(){
    // ($('#loadingModal')as any).modal('show');
    const formdata = new FormData();
    formdata.append('rangeProperty', this.raSearch.mode);
    if (this.regression.indexOf(this.raSearch.mode) > -1){
      if (this.inputData.leftMargin < this.inputData.rightMargin){
        formdata.append('leftMargin', this.inputData.leftMargin);
        formdata.append('rightMargin', this.inputData.rightMargin);
      }
      else{
        formdata.append('leftMargin', this.inputData.rightMargin);
        formdata.append('rightMargin', this.inputData.leftMargin);
      }
    }
    else if (this.classification.indexOf(this.raSearch.mode) > -1){
      formdata.append('rangeRadio', this.inputData.rangeRadio);
    }
    else{
      alert('Illegal input');
    }
    // console.log(this.inputData.Smiles);

    const httpOptions = {headers: new HttpHeaders()};
    // let api = 'http://172.16.41.163:8000/explainable-admet/search/range';
    const api = this.restHost + '/InterpretableAdmet/search/range';
    // send request of post and get data from backstage
    this.http.post(api, formdata, httpOptions).subscribe((response: any) => {
      // console.log(response.data);
      // console.log(response);
      this.len = response.length - 1;
      if (response[response.length - 1].validation){
        this.validation = response[response.length - 1].validation;
      }
      else{
        response = response.slice(0, this.len);
        // console.log(response);
        this.storage.setData(response);
        this.router.navigateByUrl('/InterpretableAdmet/search/rangeResult');
        // ($('#loadingModal')as any).modal('hide');
      }
    },
    (error: any) => {
      // console.log(error.error);
      // ($('#searchLoadingModal')as any).modal('hide');
      // ($('#loadingModal')as any).modal('hide');
      if (error.error.msg){
        this.searchError = error.error.msg;
      }
      else{
        this.searchError = 'Server Not Found ';
      }
      ($('#searchModal')as any).modal('show');
    });
  }

  postSimilarityData(){
    ($('#loadingModal')as any).modal('show');
    const formdata = new FormData();
    // ($('#searchLoadingModal')as any).modal('show');
    formdata.append('smiles', this.inputData.substructure);
    formdata.append('fp', this.fingerprinter.mode);
    formdata.append('threshold', this.similarity);
    const httpOptions = {headers: new HttpHeaders()};
    const api = this.restHost + '/InterpretableAdmet/search/similarity';
    // send request of post and get data from backstage
    this.http.post(api, formdata, httpOptions).subscribe((response: any) => {
      // console.log(response);
      // console.log(response[0].validation);
      this.len = response.length - 1;
      // console.log(response[response.length - 1].validation);
      if (response[response.length - 1].validation){
        this.validation = response[response.length - 1].validation;
      }
      else if (response.slice(0, this.len)){
        console.log(response.slice(0, this.len));
        this.storage.setData(response.slice(0, this.len));
        this.router.navigateByUrl('/InterpretableAdmet/search/similarityResult');
        ($('#loadingModal')as any).modal('hide');
      }
      else{
        alert('kong');
      }
    },
    (error: any) => {
      ($('#loadingModal')as any).modal('hide');
      if (error.error.msg){
        this.searchError = error.error.msg;
      }
      else{
        this.searchError = 'Server Not Found ';
      }
      // ($('#searchLoadingModal')as any).modal('hide');
      ($('#searchModal')as any).modal('show');
    });
  }

}
