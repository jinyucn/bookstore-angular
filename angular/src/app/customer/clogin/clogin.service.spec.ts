import { TestBed } from '@angular/core/testing';

import { CloginService } from './clogin.service';

describe('CloginService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CloginService = TestBed.get(CloginService);
    expect(service).toBeTruthy();
  });
});
