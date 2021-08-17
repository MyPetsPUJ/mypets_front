import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearAnimalGatoComponent } from './crear-animal-gato.component';

describe('CrearAnimalGatoComponent', () => {
  let component: CrearAnimalGatoComponent;
  let fixture: ComponentFixture<CrearAnimalGatoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearAnimalGatoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearAnimalGatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
