import { TestBed } from '@angular/core/testing';

import { LoadWeatherService } from './load-weather.service';

describe('LoadWeatherService', () => {
  let service: LoadWeatherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadWeatherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
