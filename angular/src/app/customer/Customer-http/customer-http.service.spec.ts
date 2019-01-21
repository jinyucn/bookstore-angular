import { TestBed } from '@angular/core/testing';

import { CustomerHttpService } from './customer-http.service';

describe('CustomerHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomerHttpService = TestBed.get(CustomerHttpService);
    expect(service).toBeTruthy();
  });
});
