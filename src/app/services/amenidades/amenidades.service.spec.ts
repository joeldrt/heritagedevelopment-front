import { TestBed } from '@angular/core/testing';

import { AmenidadesService } from './amenidades.service';

describe('AmenidadesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AmenidadesService = TestBed.get(AmenidadesService);
    expect(service).toBeTruthy();
  });
});
