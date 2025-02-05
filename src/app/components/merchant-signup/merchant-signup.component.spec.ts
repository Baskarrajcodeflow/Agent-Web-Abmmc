import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantSignupComponent } from './merchant-signup.component';

describe('MerchantSignupComponent', () => {
  let component: MerchantSignupComponent;
  let fixture: ComponentFixture<MerchantSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MerchantSignupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MerchantSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
