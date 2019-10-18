import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaddressComponent } from './listaddress.component';

describe('ListaddressComponent', () => {
  let component: ListaddressComponent;
  let fixture: ComponentFixture<ListaddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
