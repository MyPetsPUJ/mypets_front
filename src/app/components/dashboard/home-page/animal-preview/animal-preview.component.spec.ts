import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalPreviewComponent } from './animal-preview.component';

describe('AnimalPreviewComponent', () => {
  let component: AnimalPreviewComponent;
  let fixture: ComponentFixture<AnimalPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimalPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimalPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
