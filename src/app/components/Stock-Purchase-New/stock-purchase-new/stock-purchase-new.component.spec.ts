import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockPurchaseNewComponent } from './stock-purchase-new.component';

describe('StockPurchaseNewComponent', () => {
  let component: StockPurchaseNewComponent;
  let fixture: ComponentFixture<StockPurchaseNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockPurchaseNewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StockPurchaseNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
