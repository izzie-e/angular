import { TestBed } from '@angular/core/testing';

import { FetchGuardGuard } from './fetch-guard.guard';

describe('FetchGuardGuard', () => {
  let guard: FetchGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(FetchGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
