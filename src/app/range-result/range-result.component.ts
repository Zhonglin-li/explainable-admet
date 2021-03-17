import { Component, OnInit, ViewChild } from '@angular/core';
import {StorageService} from '../service/storage/storage.service';
import {JsmeComponent} from '../jsme/jsme/jsme.component';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-range-result',
  templateUrl: './range-result.component.html',
  styleUrls: ['./range-result.component.css']
})
export class RangeResultComponent implements OnInit {
  @ViewChild(JsmeComponent) jsme: JsmeComponent;
  public historyList: any[] = [];
  public result: any;
  public tableres: any;
  public restHost = environment.REST_HOST;
  constructor(public http: HttpClient, public storage: StorageService, public route: ActivatedRoute, private router: Router, ) { }

  ngOnInit(): void {
    if (this.storage.getData()){
      this.result = this.storage.getData();
      // use method set() of service:StorageService to implement session storage of data,and judge if the data exits or not
      if (this.historyList.indexOf(this.result) === -1){
        this.historyList.push(this.result);
        this.storage.remove('rangeResult');
        this.storage.set('rangeResult', this.historyList);
      }
    }
    else if (this.storage.get('rangeResult')){
      this.historyList = this.storage.get('rangeResult');
      this.result = this.historyList[this.historyList.length - 1 ];
    }
    else{
      this.router.navigateByUrl('/explainable-admet/search');
    }
    // tslint:disable-next-line: only-arrow-functions
    $(function(): void{
      const table = $('#Result').DataTable( {
        dom: 'ipt',
        serverSide: true,
        ordering: false,
        processing: true,
        ajax: {
          url: 'http://172.16.41.163:8000/explainable-admet/search/range',
        },
        columnDefs: [
          {
            targets: 1,
            data: 'Mol',
            render(data) {
              return '<img src="data:image/png;base64,' + data + '"/>';
            }

        }
        ],
        columns: [
          {
            data: 'id',
            className: 'rangeRes'
          },
          {
            data: 'Mol',
            className: 'rangeRes'
          },
          {
            data: 'ChemblId',
            className: 'rangeRes'
          },
          {
            data: 'Label',
            className: 'rangeRes'
          },

      ],
      createdRow( row, data, dataIndex ) {
        $('td', row).css( 'text-align', 'center');
        $('td', row).css( 'vertical-align', 'middle' );
        $('td', row).css( 'padding', 0 );
      }

      } );
    });
  }

}
