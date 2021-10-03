import { TestBed } from '@angular/core/testing';

import { PrivsService } from './privs.service';

describe('PrivsService', () => {
  let service: PrivsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrivsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
