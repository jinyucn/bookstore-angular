import { TestBed } from '@angular/core/testing';

import { CproductService } from './cproduct.service';

describe('CproductService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CproductService = TestBed.get(CproductService);
    expect(service).toBeTruthy();
  });
});
