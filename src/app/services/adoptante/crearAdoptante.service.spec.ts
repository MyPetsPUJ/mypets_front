import { TestBed } from '@angular/core/testing';

import { CrearAdoptanteService } from './crearAdoptante.service';

describe('AuthService', () => {
  let service: CrearAdoptanteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrearAdoptanteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
