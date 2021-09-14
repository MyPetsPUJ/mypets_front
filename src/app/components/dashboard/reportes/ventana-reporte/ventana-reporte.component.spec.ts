import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentanaReporteComponent } from './ventana-reporte.component';

describe('VentanaReporteComponent', () => {
  let component: VentanaReporteComponent;
  let fixture: ComponentFixture<VentanaReporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentanaReporteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VentanaReporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
