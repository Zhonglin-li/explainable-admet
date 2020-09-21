import { Component, OnInit , ViewChild} from '@angular/core';
import {JsmeComponent} from '../jsme/jsme/jsme.component';
// 当成一个服务
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {StorageService} from '../service/storage/storage.service';
// import {FileUploader} from 'ng2-file-upload';
// const URL = 'http://192.168.1.135:8000/admet/prediction';

@Component({
  selector: 'app-filter-choose',
  templateUrl: './filter-choose.component.html',
  styleUrls: ['./filter-choose.component.css']
})
export class FilterChooseComponent implements OnInit {
  @ViewChild(JsmeComponent) jsme: JsmeComponent;
  // jsmeSmiles: string;
  @ViewChild("SmilesFile") SmilesFile: any;

  // hasBaseDropZoneOver: boolean;
  // hasAnotherDropZoneOver: boolean;
  // response: string;
  public data: any = {};
  public file: File;

  public inputData: any = {
    Smiles: 'CC1=CN=C(C(=C1OC)C)CS(=O)C2=NC3=C(N2)C=C(C=C3)OC',
    Property: 'LogS (Solubility)',
    // File: '',
  };
  public filter: any = {
    mode: 'By Inputting SMILES',
    modes: ['By Inputting SMILES', 'By Uploading Files', 'By Drawing Molecule from Editor', ],
  };
  public physicochemical: any = {
    mode: 'LogS (Solubility)',
    modes: ['LogS (Solubility)', 'LogD (Distribution Coefficient D at PH=7.4)', 'LogP (Distribution Coefficient P)',
    ],
  };
  public absorption: any = {
    mode: 'LogPapp (Caco-2 Permeability)',
    modes: ['LogPapp (Caco-2 Permeability)', 'Pgp-inhibitor', 'HIA (Human Intestinal Absorption)',
    ],
  };
  public distribution: any = {
    mode: 'PPB (Plasma Protein Binding)',
    modes: ['PPB (Plasma Protein Binding)', 'BBB (Blood–Brain Barrier)',
    ],
  };
  public metabolism: any = {
    mode: 'CYP450 1A2 inhibitor',
    modes: ['CYP450 1A2 inhibitor', 'CYP450 3A4 inhibitor', 'CYP450 3A4 substrate', 'CYP450 2C9 inhibitor', 'CYP450 2C9 substrate', 'CYP450 2C19 inhibitor', 'CYP450 2D6 inhibitor', 'CYP450 2D6 substrate'

    ],
  };
  public excretion: any = {
    mode: 'T 1/2 (Half Life)',
    modes: ['T 1/2 (Half Life)', 'CL (Clearance)',
    ],
  };
  public toxicity: any = {
    mode: 'hERG (hERG Blockers)',
    modes: ['hERG (hERG Blockers)', 'H-HT (Human Hepatotoxicity)', 'Ames (Ames Mutagenicity)', 'DILI (Drug Induced Liver Injury)', 'FDAMDD (Maximum Recommended Daily Dose)',
    ],
  };

  constructor(public http: HttpClient, private router: Router, public storage: StorageService, ) { 
  }

  ngOnInit(){
    this.inputData.Smiles = 'CC1=CN=C(C(=C1OC)C)CS(=O)C2=NC3=C(N2)C=C(C=C3)OC';
  }
  ngAfterViewInit(): void{
    // console.log(this.SmilesFile)
  }
  getJsmeSmiles(){
    this.inputData.Smiles = this.jsme.smiles;
  }
  getData(){
    let api = 'http://192.168.1.135:8000/admet/prediction';
    // rxjs
    this.http.get(api).subscribe((response) => {
      console.log(response);
    });
  }
  // postData(){
  //   // const httpOptions = {headers: new HttpHeaders({'content-type': 'application/json'})};
  //   // let api= 'http://192.168.1.135:8000/admet/prediction';
  //   // this.http.post(api, {'smiles': this.inputData.Smiles, 'Property': this.inputData.Property}, httpOptions).subscribe((response)=>{
  //   //   console.log(response);
  //   //   this.storage.setData({Property: this.inputData.Property});
  //   //   this.storage.setData( response[0]);
  //   //   console.log(this.storage.getData());
  //   // if (this.inputData.File){

  //   // }
  //     // this.data['smiles'] = this.inputData.Smiles;
  //     // this.data['Property'] = this.inputData.Property;
  //     // this.data['FILES'] = this.inputData.File;
  //     this.formdata.append('smiles', this.inputData.Smiles);
  //     this.formdata.append('Property', this.inputData.Property);
  //     this.storage.setData(this.formdata);
  //     console.log(this.storage.getData());
  //     // setTimeout(() => this.router.navigateByUrl('/admet/prediction/result'), 1000);
  //     this.router.navigateByUrl('/admet/prediction/result');
    
  // }
  inputFile(file: File[]){
    console.log(file[0]);
    // this.inputData.File = file[0];
    this.file =  file[0];
    
  }
  signup(): void{
    const formdata = new FormData();
    if (this.file){
      formdata.append('file', this.file);
      console.log(this.file);
    }
    else{
      formdata.append('smiles', this.inputData.Smiles);
      console.log(this.inputData.Smiles);
    }
    formdata.append('Property', this.inputData.Property);
    console.log(formdata.get('Property'));
    this.storage.setData(formdata);
    console.log(this.storage.getData().get('Property'));
    // setTimeout(() => this.router.navigateByUrl('/admet/prediction/result'), 1000);
    this.router.navigateByUrl('/admet/prediction/result');
  }
}
