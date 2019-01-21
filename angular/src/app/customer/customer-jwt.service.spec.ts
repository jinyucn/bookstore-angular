import { TestBed } from '@angular/core/testing';

import { CustomerJwtService } from './customer-jwt.service';

describe('CustomerJwtService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomerJwtService = TestBed.get(CustomerJwtService);
    expect(service).toBeTruthy();
  });
});
