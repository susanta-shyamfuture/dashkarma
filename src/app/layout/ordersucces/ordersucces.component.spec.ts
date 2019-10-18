import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersuccesComponent } from './ordersucces.component';

describe('OrdersuccesComponent', () => {
  let component: OrdersuccesComponent;
  let fixture: ComponentFixture<OrdersuccesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersuccesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersuccesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
