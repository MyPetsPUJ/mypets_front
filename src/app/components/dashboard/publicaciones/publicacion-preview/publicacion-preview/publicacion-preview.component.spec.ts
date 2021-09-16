import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicacionPreviewComponent } from './publicacion-preview.component';

describe('PublicacionPreviewComponent', () => {
  let component: PublicacionPreviewComponent;
  let fixture: ComponentFixture<PublicacionPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicacionPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicacionPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
