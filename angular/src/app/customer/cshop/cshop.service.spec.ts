import { TestBed } from '@angular/core/testing';

import { CshopService } from './cshop.service';

describe('CshopService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CshopService = TestBed.get(CshopService);
    expect(service).toBeTruthy();
  });
});
