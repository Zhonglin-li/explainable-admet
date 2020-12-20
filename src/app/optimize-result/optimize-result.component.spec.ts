import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptimizeResultComponent } from './optimize-result.component';

describe('OptimizeResultComponent', () => {
  let component: OptimizeResultComponent;
  let fixture: ComponentFixture<OptimizeResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptimizeResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptimizeResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
