import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DakimakuraComponent } from './dakimakura.component';

describe('DakimakuraComponent', () => {
  let component: DakimakuraComponent;
  let fixture: ComponentFixture<DakimakuraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DakimakuraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DakimakuraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
