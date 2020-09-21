import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  activeDom = 1;

  constructor() { }
  addUnderline(index){
    this.activeDom = index;
  }

  ngOnInit(): void {
  }

}
