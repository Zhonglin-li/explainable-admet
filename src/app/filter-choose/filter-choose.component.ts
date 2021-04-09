import { Component, OnInit , ViewChild} from '@angular/core';
import {JsmeComponent} from '../jsme/jsme/jsme.component';
// 当成一个服务
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {StorageService} from '../service/storage/storage.service';
import {environment} from '../../environments/environment';
import { shallowEqual } from 'ng-zorro-antd';



// import {FileUploader} from 'ng2-file-upload';
// const URL = 'http://172.16.41.163:8000/explainable-admet/prediction';


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
  public validation = '';
  public data: any = {};
  public file: File;
  public predictionError = '';
  private restHost = environment.REST_HOST;
  public api = this.restHost + '/InterpretableAdmet/prediction';
  public predictionData: any = {
    Smiles: '',
    // File: '',
  };
  public filter: any = {
    mode: 'By Inputting SMILES',
    modes: ['By Inputting SMILES',  'By Drawing Molecule from Editor', ],
  };
  // 'By Uploading Files',

  constructor(private http: HttpClient, private router: Router, public storage: StorageService, ) {
  }

  ngOnInit(){
  }
  // getJsmeSmiles(){
  //   this.predictionData.Smiles = this.jsme.smiles;
  // }
  // getData(){
  //   // const api = this.restHost + '/explainable-admet/prediction';
  //   // rxjs
  //   this.http.get(this.api).subscribe((response) => {
  //     // console.log(response);
  //   });
  // }
  getData(smiles){
    if (smiles){
      const formdata = new FormData();
      ($('#loadingModal')as any).modal('show');
      formdata.append('smiles', smiles);
      const httpOptions = {headers: new HttpHeaders(), withCredentails: true};
      this.http.post(this.api, formdata, httpOptions).subscribe((response: any) => {
        // console.log(response);
        if (response[0].validation){
          this.validation = response[0].validation;
        }
        else{
          this.storage.setData(response);
          this.router.navigateByUrl('/InterpretableAdmet/prediction/result');
          ($('#loadingModal')as any).modal('hide');
        }
      },
      (error: any) => {
        // console.log(error.error);
        if (error.error.msg){
          this.predictionError = error.error.msg;
        }
        else{
          this.predictionError = 'Server Not Found ';
        }
        ($('#loadingModal')as any).modal('hide');
        ($('#predictionModal')as any).modal('show');
      }
      );
    }
    else{
      ($('#jsmeModal')as any).modal('show');
    }
  }
  inputFile(file: File[]){
    console.log(file[0]);
    // this.inputData.File = file[0];
    this.file =  file[0];
  }
  rest_form(){
    this.filter.mode = 'By Inputting SMILES';
    this.predictionData.Smiles = '';
  }
  postData(){
    switch (this.filter.mode)
    {
      case'By Inputting SMILES':
        this.getData(this.predictionData.Smiles);
        break;
      case'By Drawing Molecule from Editor':
        this.getData(this.jsme.smiles);
        break;
    }
    // if (this.predictionData.Smiles || this.jsme.smiles){
    //   const formdata = new FormData();
    //   ($('#loadingModal')as any).modal('show');
    //   // if (this.file){
    //   //   formdata.append('file', this.file);
    //   //   // console.log(this.file);
    //   // }
    //   if (this.predictionData.Smiles){
    //     formdata.append('smiles', this.predictionData.Smiles);
    //   }
    //   else if (this.jsme.smiles){
    //     formdata.append('smiles', this.jsme.smiles);
    //   }
    //   const httpOptions = {headers: new HttpHeaders(), withCredentails: true};
    //   // send request of post and get data from backstage
    //   this.http.post(this.api, formdata, httpOptions).subscribe((response: any) => {
    //     // console.log(response);
    //     if (response[0].validation){
    //       this.validation = response[0].validation;
    //     }
    //     else{
    //       this.storage.setData(response);
    //       this.router.navigateByUrl('/InterpretableAdmet/prediction/result');
    //       ($('#loadingModal')as any).modal('hide');
    //     }
    //   },
    //   (error: any) => {
    //     // console.log(error.error);
    //     if (error.error.msg){
    //       this.predictionError = error.error.msg;
    //     }
    //     else{
    //       this.predictionError = 'Server Not Found ';
    //     }
    //     ($('#loadingModal')as any).modal('hide');
    //     ($('#predictionModal')as any).modal('show');
    //   }
    //   );
    // }
    // else{
    //   ($('#jsmeModal')as any).modal('show');
    // }

    // const httpOptions = {headers: new HttpHeaders({'content-type': 'application/json'})};
    // let api= 'http://192.168.1.135:8000/explainable-admet/prediction';
    // this.http.post(api, {'smiles': this.inputData.Smiles, 'Property': this.inputData.Property}, httpOptions).subscribe((response)=>{
    //   console.log(response);
    //   this.storage.setData({Property: this.inputData.Property});
    //   this.storage.setData( response[0]);
    //   console.log(this.storage.getData());
    // if (this.inputData.File){

    // }
      // this.data['smiles'] = this.inputData.Smiles;
      // this.data['Property'] = this.inputData.Property;
      // this.data['FILES'] = this.inputData.File;
  //     this.formdata.append('smiles', this.inputData.Smiles);
  //     this.formdata.append('Property', this.inputData.Property);
  //     this.storage.setData(this.formdata);
  //     console.log(this.storage.getData());
    // setTimeout(() => this.router.navigateByUrl('/explainable-admet/prediction/result'), 1500);
    // this.router.navigateByUrl('/explainable-admet/prediction/result');
    // return {
    //   loading: true
    // };
  }

}
