import { TestBed } from '@angular/core/testing';

import { CdetailService } from './cdetail.service';

describe('CdetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CdetailService = TestBed.get(CdetailService);
    expect(service).toBeTruthy();
  });
});
