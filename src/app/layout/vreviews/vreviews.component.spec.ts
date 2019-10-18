import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VreviewsComponent } from './vreviews.component';

describe('VreviewsComponent', () => {
  let component: VreviewsComponent;
  let fixture: ComponentFixture<VreviewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VreviewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VreviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
