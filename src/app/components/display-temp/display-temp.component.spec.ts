import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayTempComponent } from './display-temp.component';

describe('DisplayTempComponent', () => {
  let component: DisplayTempComponent;
  let fixture: ComponentFixture<DisplayTempComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayTempComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayTempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
