import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TapestryComponent } from './tapestry.component';

describe('TapestryComponent', () => {
  let component: TapestryComponent;
  let fixture: ComponentFixture<TapestryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TapestryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TapestryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
