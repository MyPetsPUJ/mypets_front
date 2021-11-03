import { TestBed } from '@angular/core/testing';

import { DatosCrearAdoptanteService } from './datos-crear-adoptante.service';

describe('DatosCrearAdoptanteService', () => {
  let service: DatosCrearAdoptanteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatosCrearAdoptanteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
