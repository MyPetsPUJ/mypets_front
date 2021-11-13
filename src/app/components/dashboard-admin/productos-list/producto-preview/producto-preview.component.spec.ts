import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoPreviewComponent } from './producto-preview.component';

describe('ProductoPreviewComponent', () => {
  let component: ProductoPreviewComponent;
  let fixture: ComponentFixture<ProductoPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductoPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
