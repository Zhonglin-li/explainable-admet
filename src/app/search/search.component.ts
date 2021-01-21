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
  public search: any = {
    mode: 'Range Property',
    modes: ['Range Property', 'Accurate Property'],
  };
  public inputData: any = {
    Smiles: '',
    leftMargin: '',
    rightMargin: '',
    rangeRadio: '',
  };

  public raSearch = {
    mode: 'Solubility',
    modes: ['Solubility', 'LogD', 'Plasma protein binding', 'Volume of distribution', 'Acute Oral Toxicity', 'Pyriformis', 'Human Intestinal Absorption', 'Blood Brain Barrier', 'BCRP', 'OATP1B3 inhibitior', 'P-glycoprotein inhibitior', 'CYP3A4 substrate', 'CYP2D6 substrate', 'CYP2C9 inhibition', 'CYP2D6 inhibition', 'Carcinogenicity', 'Eye corrosion', 'Ames mutagenesis', 'FDAMDD', 'Genotoxicity', 'Honey bee toxicity', 'Fish aquatic toxicity', 'Caco-2', 'Human oral bioavailability', 'OATP1B1 inhibitior', 'OCT2 inhibitior', 'P-glycoprotein substrate', 'CYP2C9 substrate', 'CYP3A4 inhibition', 'CYP2C19 inhibition', 'CYP1A2 inhibition', 'DILI', 'Eye irritation', 'H-HT', 'HERG', 'Skin_sensitization', 'Biodegradation', 'Boiling point', 'Bioconcentration factor', 'Logvp', 'Melting point', 'Logp', 'Hydration Free Energy', 'Lipophilicity', 'LD50', 'LogCL', 'LogMRT', 'T 1/2(Half Life)'
    ]
  };
  public regression = [
    'Solubility', 'LogD', 'Plasma protein binding', 'Volume of distribution',  'Acute Oral Toxicity', 'Pyriformis', 'Boiling point',
    'Bioconcentration factor', 'Logvp', 'Melting point', 'Logp', 'Hydration Free Energy', 'Lipophilicity', 'LD50', 'LogCL', 'LogMRT', 'T 1/2(Half Life)'
  ];
  public classification = [
    'Human Intestinal Absorption', 'Blood Brain Barrier', 'BCRP', 'OATP1B3 inhibitior', 'P-glycoprotein inhibitior', 'CYP3A4 substrate', 'CYP2D6 substrate', 'CYP2C9 inhibition', 'CYP2D6 inhibition', 'Carcinogenicity', 'Eye corrosion', 'Ames mutagenesis', 'FDAMDD', 'Genotoxicity', 'Honey bee toxicity', 'Fish aquatic toxicity', 'Caco-2', 'Human oral bioavailability', 'OATP1B1 inhibitior', 'OCT2 inhibitior', 'P-glycoprotein substrate', 'CYP2C9 substrate', 'CYP3A4 inhibition', 'CYP2C19 inhibition', 'CYP1A2 inhibition', 'DILI', 'Eye irritation', 'H-HT', 'HERG', 'Skin_sensitization', 'Biodegradation'
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
    const api = this.restHost + '/explainable-admet/search/property';
    // send request of post and get data from backstage
    this.http.post(api, formdata, httpOptions).subscribe((response) => {
      console.log(response);
      // console.log(response[0].validation);
      if (response[0].validation){
        this.validation = response[0].validation;
      }
      else{
        this.storage.setData(response);
        // setTimeout(() => this.router.navigateByUrl('/explainable-admet/search/propertyResult'), 2000);
        // ($('#searchLoadingModal')as any).modal('hide');
        // ($('#searchLoadingModal')as any).modal('dispose');
        this.router.navigateByUrl('/explainable-admet/search/propertyResult');
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
    const api = this.restHost + '/explainable-admet/search/range';
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
        this.router.navigateByUrl('/explainable-admet/search/rangeResult');
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

}
