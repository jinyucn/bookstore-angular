import { TestBed } from '@angular/core/testing';

import { OrderdetailService } from './orderdetail.service';

describe('OrderdetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrderdetailService = TestBed.get(OrderdetailService);
    expect(service).toBeTruthy();
  });
});
