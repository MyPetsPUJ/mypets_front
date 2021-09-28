import { TestBed } from '@angular/core/testing';

import { EnviarFormularioAdopcionService } from './enviar-formulario-adopcion.service';

describe('EnviarFormularioAdopcionService', () => {
  let service: EnviarFormularioAdopcionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnviarFormularioAdopcionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
