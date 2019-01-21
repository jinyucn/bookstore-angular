import { TestBed } from '@angular/core/testing';

import { SliderAreaService } from './slider-area.service';

describe('SliderAreaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SliderAreaService = TestBed.get(SliderAreaService);
    expect(service).toBeTruthy();
  });
});
