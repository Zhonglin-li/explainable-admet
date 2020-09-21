import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LitemolComponent } from './litemol.component';

describe('LitemolComponent', () => {
  let component: LitemolComponent;
  let fixture: ComponentFixture<LitemolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LitemolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LitemolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
