import { Component, OnInit } from '@angular/core';
import {StorageService} from '../service/storage/storage.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-range-result',
  templateUrl: './range-result.component.html',
  styleUrls: ['./range-result.component.css']
})
export class RangeResultComponent implements OnInit {
  public historyList: any[] = [];
  public result: any;
  constructor(public http: HttpClient, public storage: StorageService, public route: ActivatedRoute, ) { }

  ngOnInit(): void {
    $(function(): void{
      $('#example').DataTable( {
        dom: 'iptl'
    } );
    });
    if (this.storage.getData()){
      this.result = this.storage.getData();
      // console.log(this.result);
      // use method set() of service:StorageService to implement local storage of data,and judge if the data exits or not
      if (this.historyList.indexOf(this.result) === -1){
        this.historyList.push(this.result);
        this.storage.set('rangeResult', this.historyList);
      }
    }
    else{
      this.historyList = this.storage.get('rangeResult');
      this.result = this.historyList[this.historyList.length - 1 ];
    }
  }

}
