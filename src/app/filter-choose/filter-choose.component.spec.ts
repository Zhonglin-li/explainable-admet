import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterChooseComponent } from './filter-choose.component';

describe('FilterChooseComponent', () => {
  let component: FilterChooseComponent;
  let fixture: ComponentFixture<FilterChooseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterChooseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterChooseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
