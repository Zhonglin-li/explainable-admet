import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public search: any = {
    mode: 'Property',
    modes: ['Property', 'Similarity'],
  };
  public acSearch = {
    mode: 'solubility',
    modes: ['solubility', 'LogD', 'LogP', 'Papp (Caco-2 Permeability)', 'Pgp-inhibitor', 'HIA', 'PPB', 'BBB', 'P450 CYP1A2 inhibitor', 'CYP450 2C19 inhibitor', 'CYP450 2C9 inhibitor', 'CYP450 2C9 substrate', 'CYP450 2D6 inhibitor', 'CYP450 2D6 substrate', 'CYP450 3A4 inhibitor',  'CYP450 3A4 substrate', 'Clearance', 'T1/2', 'hERG', 'H-HT', 'Ames', 'DILI', 'FDAMDD'],
  };

  public fingerprinter = {
    modes: ['MACCS fingerprint', 'Daylight fingerprint', 'Atom paris fingerprint', 'Topological Torsion Fingerprint', 'Morgan Fingerprint (radius=2)']
  };

  constructor() { }

  ngOnInit(): void {
  }

}
