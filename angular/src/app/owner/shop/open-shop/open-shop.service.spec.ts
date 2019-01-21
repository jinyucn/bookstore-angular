import { TestBed } from '@angular/core/testing';

import { OpenShopService } from './open-shop.service';

describe('OpenShopService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OpenShopService = TestBed.get(OpenShopService);
    expect(service).toBeTruthy();
  });
});
