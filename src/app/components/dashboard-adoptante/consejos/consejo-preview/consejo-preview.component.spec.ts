import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsejoPreviewComponent } from './consejo-preview.component';

describe('ConsejoPreviewComponent', () => {
  let component: ConsejoPreviewComponent;
  let fixture: ComponentFixture<ConsejoPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsejoPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsejoPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
