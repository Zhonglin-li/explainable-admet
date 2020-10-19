import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelsDocsComponent } from './models-docs.component';

describe('ModelsDocsComponent', () => {
  let component: ModelsDocsComponent;
  let fixture: ComponentFixture<ModelsDocsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelsDocsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelsDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
