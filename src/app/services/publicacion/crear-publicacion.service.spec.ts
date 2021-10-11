import { TestBed } from '@angular/core/testing';

import { CrearPublicacionService } from './crear-publicacion.service';

describe('CrearPublicacionService', () => {
  let service: CrearPublicacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrearPublicacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
