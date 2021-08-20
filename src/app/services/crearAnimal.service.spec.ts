import { TestBed } from '@angular/core/testing';

import { CrearAnimalService } from './crearAnimal.service';

describe('CrearAnimalService', () => {
  let service: CrearAnimalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrearAnimalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
