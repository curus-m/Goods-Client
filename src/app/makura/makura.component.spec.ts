import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakuraComponent } from './makura.component';

describe('MakuraComponent', () => {
  let component: MakuraComponent;
  let fixture: ComponentFixture<MakuraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakuraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakuraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
