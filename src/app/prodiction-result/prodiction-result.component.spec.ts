import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdictionResultComponent } from './prodiction-result.component';

describe('ProdictionResultComponent', () => {
  let component: ProdictionResultComponent;
  let fixture: ComponentFixture<ProdictionResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdictionResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdictionResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
