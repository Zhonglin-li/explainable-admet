import { Component, OnInit, ViewChild } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {StorageService} from '../service/storage/storage.service';

@Component({
  selector: 'app-optimize',
  templateUrl: './optimize.component.html',
  styleUrls: ['./optimize.component.css']
})
export class OptimizeComponent implements OnInit {

  public validation = '';
  public optimizeData: any = {
    Smiles: '',
  };

  constructor(private http: HttpClient, private router: Router, public storage: StorageService,) { }

  ngOnInit(): void {
  }
  postData(){
    ($('#loadingModal')as any).modal('show');
    const formdata = new FormData();
    formdata.append('smiles', this.optimizeData.Smiles);
    // console.log(this.inputData.Smiles);
    const httpOptions = {headers: new HttpHeaders(), withCredentails: true};
    let api = 'http://172.16.41.163:8000/admetgcn/optimize';
    this.http.post(api, formdata, httpOptions).subscribe((response: any) => {
      console.log(response);
      this.storage.setData(response);
      this.router.navigateByUrl('/admetgcn/optimize/result');
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
        // alert('server not found ');
      }
      ($('#validationModal')as any).modal('show');
    }
    );
 
  }

}
