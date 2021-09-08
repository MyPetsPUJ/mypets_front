import { TestBed } from '@angular/core/testing';

import { EstadoSolicitudAdopcionService } from './estado-solicitud-adopcion.service';

describe('EstadoSolicitudAdopcionService', () => {
  let service: EstadoSolicitudAdopcionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstadoSolicitudAdopcionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
