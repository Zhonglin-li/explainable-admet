import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {StorageService} from '../service/storage/storage.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public validation = '';
  public len: any;
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
  // public acSearch = {
  //   mode: 'solubility',
  //   modes: ['solubility', 'LogD', 'LogP', 'Papp (Caco-2 Permeability)', 'Pgp-inhibitor', 'HIA', 'PPB', 'BBB', 'P450 CYP1A2 inhibitor', 'CYP450 2C19 inhibitor', 'CYP450 2C9 inhibitor', 'CYP450 2C9 substrate', 'CYP450 2D6 inhibitor', 'CYP450 2D6 substrate', 'CYP450 3A4 inhibitor',  'CYP450 3A4 substrate', 'Clearance', 'T1/2', 'hERG', 'H-HT', 'Ames', 'DILI', 'FDAMDD'],
  // };
  public raSearch = {
    mode: 'Water solubility',
    modes: ['Water solubility', 'LogD', 'Plasma protein binding', 'Volume of distribution', 'T1/2', 'Acute Oral Toxicity', 'Pyriformis', 'Human Intestinal Absorption', 'Blood Brain Barrier', 'BCRP', 'OATP1B3 inhibitior', 'P-glycoprotein inhibitior', 'CYP3A4 substrate', 'CYP2D6 substrate', 'CYP2C9 inhibition', 'CYP2D6 inhibition', 'Carcinogenicity', 'Eye corrosion', 'Ames mutagenesis', 'FDAMDD', 'Genotoxicity', 'Honey bee toxicity', 'Fish aquatic toxicity', 'Caco-2', 'Human oral bioavailability', 'OATP1B1 inhibitior', 'OCT2 inhibitior', 'P-glycoprotein substrate', 'CYP2C9 substrate', 'CYP3A4 inhibition', 'CYP2C19 inhibition', 'CYP1A2 inhibition', 'DILI', 'Eye irritation', 'H-HT', 'HERG', 'Skin_sensitization', 'Biodegradation'
    ]
  };
  public regression = [
    'Water solubility', 'LogD', 'Plasma protein binding', 'Volume of distribution', 'T1/2', 'Acute Oral Toxicity', 'Pyriformis'
  ];
  public classification = [
    'Human Intestinal Absorption', 'Blood Brain Barrier', 'BCRP', 'OATP1B3 inhibitior', 'P-glycoprotein inhibitior', 'CYP3A4 substrate', 'CYP2D6 substrate', 'CYP2C9 inhibition', 'CYP2D6 inhibition', 'Carcinogenicity', 'Eye corrosion', 'Ames mutagenesis', 'FDAMDD', 'Genotoxicity', 'Honey bee toxicity', 'Fish aquatic toxicity', 'Caco-2', 'Human oral bioavailability', 'OATP1B1 inhibitior', 'OCT2 inhibitior', 'P-glycoprotein substrate', 'CYP2C9 substrate', 'CYP3A4 inhibition', 'CYP2C19 inhibition', 'CYP1A2 inhibition', 'DILI', 'Eye irritation', 'H-HT', 'HERG', 'Skin_sensitization', 'Biodegradation'
  ];

  public fingerprinter = {
    modes: ['MACCS fingerprint', 'Daylight fingerprint', 'Atom paris fingerprint', 'Topological Torsion Fingerprint', 'Morgan Fingerprint (radius=2)']
  };

  constructor(private http: HttpClient, private router: Router, public storage: StorageService, ) { }

  ngOnInit(): void {
  }
  postData(){
    const formdata = new FormData();

    formdata.append('smiles', this.inputData.Smiles);
    // console.log(this.inputData.Smiles);

    const httpOptions = {headers: new HttpHeaders()};
    let api = 'http://172.16.41.163:8000/admetgcn/search/property';
    // send request of post and get data from backstage
    this.http.post(api, formdata, httpOptions).subscribe((response)=>{
      console.log(response);
      console.log(response[0].validation);
      if (response[0].validation){
        this.validation = response[0].validation;
      }
      else{
        this.storage.setData(response);
        this.router.navigateByUrl('/admetgcn/search/propertyResult');
      }
    },
    (error: any) => {
      // console.log(error.error.msg);
      if (error.error.msg){
        alert(error.error.msg);
      }
      else{
        alert('server not found ');
      }
    });
    // setTimeout(() => this.router.navigateByUrl('/admetgcn/search/result'), 1500);
  }
  postRangeData(){
    const formdata = new FormData();

    formdata.append('rangeProperty', this.raSearch.mode);
    if (this.regression.indexOf(this.raSearch.mode) > -1){
      formdata.append('leftMargin', this.inputData.leftMargin);
      formdata.append('rightMargin', this.inputData.rightMargin);
    }
    else if (this.classification.indexOf(this.raSearch.mode) > -1){
      formdata.append('rangeRadio', this.inputData.rangeRadio);
    }
    else{
      alert('Illegal input');
    }
    // console.log(this.inputData.Smiles);

    const httpOptions = {headers: new HttpHeaders()};
    let api = 'http://172.16.41.163:8000/admetgcn/search/range';
    // send request of post and get data from backstage
    this.http.post(api, formdata, httpOptions).subscribe((response: any)=>{
      // console.log(response);
      // console.log(response[response.length - 1]);
      // console.log(typeof(response));
      // console.log(response[response.length-1].validation);
      this.len = response.length - 1;
      if (response[response.length - 1].validation){
        this.validation = response[response.length - 1].validation;
      }
      else{
        response = response.slice(0, this.len);
        this.storage.setData(response);
        this.router.navigateByUrl('/admetgcn/search/rangeResult');
      }
    },
    (error: any) => {
      // console.log(error.error.msg);
      if (error.error.msg){
        alert(error.error.msg);
      }
      else{
        alert('server not found ');
      }
    });
  }

}
