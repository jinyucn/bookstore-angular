import { TestBed } from '@angular/core/testing';

import { CmywishService } from './cmywish.service';

describe('CmywishService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CmywishService = TestBed.get(CmywishService);
    expect(service).toBeTruthy();
  });
});
