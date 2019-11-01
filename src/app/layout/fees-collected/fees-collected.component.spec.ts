import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeesCollectedComponent } from './fees-collected.component';

describe('FeesCollectedComponent', () => {
  let component: FeesCollectedComponent;
  let fixture: ComponentFixture<FeesCollectedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeesCollectedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeesCollectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
