import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../service/storage/storage.service';
import { JsmeComponent } from '../jsme/jsme/jsme.component';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-similarity-result',
  templateUrl: './similarity-result.component.html',
  styleUrls: ['./similarity-result.component.css'],
})
export class SimilarityResultComponent implements OnInit {
  @ViewChild(JsmeComponent) jsme: JsmeComponent;
  public historyList: any[] = [];
  public result: any;
  public validation = '';
  public searchError = '';
  public tableres: any;
  public restHost = environment.REST_HOST;
  constructor(
    public http: HttpClient,
    public storage: StorageService,
    public route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    $(function (): void {
      $('#optimizeTable').DataTable({
        dom: 'iptl',
        ordering: false,
        processing: true,
      });
    });
    if (this.storage.getData()) {
      this.result = this.storage.getData();
    }
      // console.log(this.result);
      // console.log(!this.result[0] );
      // use method set() of service:StorageService to implement session storage of data,and judge if the data exits or not
    //   if (this.historyList.indexOf(this.result) === -1) {
    //     // console.log(this.result);
    //     this.historyList.push(this.result);
    //     this.storage.remove('similarityResult');
    //     this.storage.set('similarityResult', this.historyList);
    //   }
    // } else if (this.storage.get('similarityResult')) {
    //   this.historyList = this.storage.get('similarityResult');
    //   this.result = this.historyList[this.historyList.length - 1];
    // }
    else {
      this.router.navigateByUrl('/InterpretableAdmet/search');
    }
  }

  aSearch(index) {
    const formdata = new FormData();
    // console.log(this.result[index].canonical_smiles);
    formdata.append('smiles', this.result[index].canonical_smiles);
    const httpOptions = { headers: new HttpHeaders() };
    const api = this.restHost + '/InterpretableAdmet/search/property';
    this.http.post(api, formdata, httpOptions).subscribe(
      (response) => {
        // console.log(response);
        // console.log(response[0].validation);
        if (response[0].validation) {
          this.validation = response[0].validation;
        } else {
          this.storage.setData(response);
          this.router.navigateByUrl(
            '/InterpretableAdmet/search/propertyResult'
          );
        }
      },
      (error: any) => {
        if (error.error.msg) {
          this.searchError = error.error.msg;
        } else {
          this.searchError = 'Server Not Found ';
        }
        ($('#searchModal') as any).modal('show');
      }
    );
  }

  Download() {
    const downName = 'result.csv';
    const link = document.createElement('a');
    const api = this.restHost + '/InterpretableAdmet/similarity/downloadfile'; // 查一下
    this.http.get(api, { responseType: 'blob' }).subscribe((response: any) => {
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
