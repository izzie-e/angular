import { TestBed } from '@angular/core/testing';

import { SaveHoursService } from './save-hours.service';

describe('SaveHoursService', () => {
  let service: SaveHoursService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaveHoursService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
