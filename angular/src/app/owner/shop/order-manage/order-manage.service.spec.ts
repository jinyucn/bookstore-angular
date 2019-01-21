import { TestBed } from '@angular/core/testing';

import { OrderManageService } from './order-manage.service';

describe('OrderManageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrderManageService = TestBed.get(OrderManageService);
    expect(service).toBeTruthy();
  });
});
