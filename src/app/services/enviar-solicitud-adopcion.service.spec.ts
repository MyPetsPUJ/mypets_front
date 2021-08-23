import { TestBed } from '@angular/core/testing';

import { EnviarSolicitudAdopcionService } from './enviar-solicitud-adopcion.service';

describe('EnviarSolicitudAdopcionService', () => {
  let service: EnviarSolicitudAdopcionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnviarSolicitudAdopcionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
