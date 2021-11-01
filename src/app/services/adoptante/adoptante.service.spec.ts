import { TestBed } from '@angular/core/testing';

import { AdoptanteService } from './adoptante.service';

describe('AdoptanteService', () => {
  let service: AdoptanteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdoptanteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
