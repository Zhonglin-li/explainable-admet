import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RangeResultComponent } from './range-result.component';

describe('RangeResultComponent', () => {
  let component: RangeResultComponent;
  let fixture: ComponentFixture<RangeResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RangeResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RangeResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
