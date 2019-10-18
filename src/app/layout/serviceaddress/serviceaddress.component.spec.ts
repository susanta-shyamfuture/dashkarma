import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceaddressComponent } from './serviceaddress.component';

describe('ServiceaddressComponent', () => {
  let component: ServiceaddressComponent;
  let fixture: ComponentFixture<ServiceaddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceaddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceaddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
