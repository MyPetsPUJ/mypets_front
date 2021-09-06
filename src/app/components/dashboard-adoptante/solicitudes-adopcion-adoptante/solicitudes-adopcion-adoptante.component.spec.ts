import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudesAdopcionAdoptanteComponent } from './solicitudes-adopcion-adoptante.component';

describe('SolicitudesAdopcionAdoptanteComponent', () => {
  let component: SolicitudesAdopcionAdoptanteComponent;
  let fixture: ComponentFixture<SolicitudesAdopcionAdoptanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitudesAdopcionAdoptanteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudesAdopcionAdoptanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
