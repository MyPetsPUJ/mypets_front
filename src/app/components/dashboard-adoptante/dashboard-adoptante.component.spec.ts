import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAdoptanteComponent } from './dashboard-adoptante.component';

describe('DashboardAdoptanteComponent', () => {
  let component: DashboardAdoptanteComponent;
  let fixture: ComponentFixture<DashboardAdoptanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardAdoptanteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardAdoptanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
