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
      // console.log(this.result);
      // use method set() of service:StorageService to implement local storage of data,and judge if the data exits or not
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
    // $(function(): void{
    //   $('#rangeResult').DataTable( {
    //     dom: 'iptl',
    //   } );
    // });
    $(function(): void{
      let table = $('#Result').DataTable( {
        dom: 'ipt',
        serverSide: true,
        ordering: false,
        ajax: {
          url: 'http://172.16.41.163:8000/explainable-admet/search/range',
          // dataSrc: function ( json ) {
          //   for ( var i=0, ien=json.data.length ; i<ien ; i++ ) {
          //     json.data[i].Mol = '<img src="data:image/png;base64,'+ json.data[i].Mol + '"/>';
          //   }
          //   // json.data[1].Mol = '<img src="data:image/png;base64,'+ json.data[1].Mol + '"/>'
          //   // console.log(json.data[1].Mol)
          //   // console.log(json);
          //   this.tableres = json
          //   return json;
          // }
        },
        columnDefs:[
          {
            "targets": 1,
            "data": "Mol",
            "render": function(data) {
              // console.log(data)
              return '<img src="data:image/png;base64,' + data + '"/>';
            }

        }
        ],
        columns: [
          {
            data: "id",
            className: 'rangeRes'
          },
          {
            data: "Mol",
            className: 'rangeRes'
          },
          {
            data: "ChemblId",
            className: 'rangeRes'
          },
          {
            data: "Label",
            className: 'rangeRes'
          },

      ],
      createdRow( row, data, dataIndex ) {
        // $(row).addClass({'text-align': 'center'};
        //   vertical-align: middle; 
        //   padding: 0;);
        $('td', row).css( 'text-align', 'center');
        $('td', row).css( 'vertical-align', 'middle' );
        $('td', row).css( 'padding', 0 );
      }

      } );
    });
  }

}
