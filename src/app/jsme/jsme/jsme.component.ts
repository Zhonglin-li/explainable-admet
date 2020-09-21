import {AfterViewInit, Component, EventEmitter, Input, NgZone, OnChanges, OnDestroy, OnInit,
  Output, SimpleChanges} from '@angular/core';
// import {jsmeApplet,JSApplet,JSME} from '../../../assets/jsme/jsme.nocache.js'
import {GlobalService} from '../../service/global/global.service';
import {ActivatedRoute, Router} from '@angular/router';
declare const JSApplet: any;

@Component({
  selector: 'app-jsme',
  templateUrl: './jsme.component.html',
  styleUrls: ['./jsme.component.css']
})
export class JsmeComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() elementId: string;
  @Output() onEditorContentChange = new EventEmitter();
  @Input() width = '380px';
  @Input() height = '340px';
  @Input() molString = '';
  @Input() showDemo = false;
  // Please refer to http://peter-ertl.com/jsme/JSME_2017-02-26/doc.html for JSME options
  @Input() option: string;
  smiles = '';
  applet;
  private _demoSmiles = 'CC1=CN=C(C(=C1OC)C)CS(=O)C2=NC3=C(N2)C=C(C=C3)OC';

  constructor(private zone: NgZone, private globalService: GlobalService, private myRouter:Router) {
  }

  ngOnInit() {
    // console.log('jsme widget init');
  }


  readMolString(molString: String) {
    this.applet.readGenericMolecularInput(molString);
  }
  ngOnChanges(changes: SimpleChanges) {
    if (typeof (this.applet) !== 'undefined') {
      if (changes.hasOwnProperty('molString')) {
        this.applet.readGenericMolecularInput(this.molString);
      }
    }
  }
  ngAfterViewInit() {
    if (typeof (JSApplet) !== 'undefined') {
      this.applet = new JSApplet.JSME(
        this.elementId,
        this.width,
        this.height, {
          options: this.option
        });
      if (this.molString) {
        this.readMolString(this.molString);
      } else if (this.showDemo) {
        this.readMolString(this._demoSmiles);
      }
      this.applet.setAfterStructureModifiedCallback(() => {
        this.smiles = this.applet.smiles();
      });
    } else {
      this.globalService.JSMEApplet$.subscribe(jsmeApplet => {
        this.applet = new jsmeApplet.JSME(
          this.elementId,
          this.width,
          this.height, {
            options: this.option
          });
        if (this.molString) {
          this.readMolString(this.molString);
        } else if (this.showDemo) {
          this.readMolString(this._demoSmiles);
        }
        this.applet.setAfterStructureModifiedCallback(() => {
          this.smiles = this.applet.smiles();
        });
      });
    }
  }
  // tc() {
  //   alert(this.applet.smiles());
  // }
  // tj() {
  //   this.myRouter.navigate(['/table/', this.applet.smiles()]);
  // }
  }

