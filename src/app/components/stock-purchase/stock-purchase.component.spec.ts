import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockPurchaseComponent } from './stock-purchase.component';

describe('StockPurchaseComponent', () => {
  let component: StockPurchaseComponent;
  let fixture: ComponentFixture<StockPurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockPurchaseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StockPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
