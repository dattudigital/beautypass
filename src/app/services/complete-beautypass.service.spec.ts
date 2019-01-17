import { TestBed } from '@angular/core/testing';

import { CompleteBeautypassService } from './complete-beautypass.service';

describe('CompleteBeautypassService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CompleteBeautypassService = TestBed.get(CompleteBeautypassService);
    expect(service).toBeTruthy();
  });
});
