import { TestBed, inject } from '@angular/core/testing';

import { SvcTreeDataService } from './svc-tree-data.service';

describe('SvcTreeDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SvcTreeDataService]
    });
  });

  it('should be created', inject([SvcTreeDataService], (service: SvcTreeDataService) => {
    expect(service).toBeTruthy();
  }));
});
