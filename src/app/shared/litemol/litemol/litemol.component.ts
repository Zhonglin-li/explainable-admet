import {AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges} from '@angular/core';

declare const LiteMol: any;
@Component({
  selector: 'app-litemol',
  templateUrl: './litemol.component.html',
  styleUrls: ['./litemol.component.css']
})
export class LitemolComponent implements OnInit, AfterViewInit, OnChanges {
  title = '#app';
  id = '3frz';
  plugin;
  litemolStyle: any;
  noteStyle: any;
  @Input() targetId: string;
  @Input() url: string;
  @Input() data: any;
  @Input() elementId: string;
  @Input() width: string;
  @Input() height: string;
  @Input() backgroundColor: string;
  constructor() {
  }

  ngOnInit() {
    this.litemolStyle = {
      'width': this.width ? this.width : '450px',
      'height': this.height ? this.height : '450px',
      'position': 'relative',
      'margin-top' : '80px',
      'margin-bottom': '20px',
      'margin-left': '20px'
    };
    this.noteStyle = {
      'width': this.width ? this.width : '450px',
      'margin-left': '20px'
    };
  }

  ngAfterViewInit() {
    this.plugin = LiteMol.Plugin.create({
          target: `#${this.elementId}`,
          viewportBackground: this.backgroundColor ? this.backgroundColor : 'black',
          layoutState: {
            hideControls: true,
            isExpanded: false
          },
          allowAnalytics: true
        });
  }

  ngOnChanges(changes: SimpleChanges) {
    // this.fileRead();
    // console.log(this.plugin);
    // console.log(LiteMol);
    // console.log('id:', this.targetId, 'url:', this.url, 'changes:', changes); // todo delete
    // instead of url, it is possible to use
    // data: "string" or BinaryString or ArrayBuffer (for BinaryCIF)
    const body = {
      id: this.targetId,
      format: 'pdb',
      moleculeRef: this.targetId + '-molecule',
      modelRef: this.targetId + '-model',
    };
    // 判断 url 和 data
    if (this.url) {
      Object.assign(body, {url: this.url});
    } else {
      Object.assign(body, {data: this.data});
    }
    this.plugin.loadMolecule(body)
      .then(() => {
      console.log('Molecule loaded');
    }).catch(e => {
      console.error(e);
    });
  }


}
