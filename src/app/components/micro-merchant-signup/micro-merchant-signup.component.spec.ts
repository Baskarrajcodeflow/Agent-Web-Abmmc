import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicroMerchantSignupComponent } from './micro-merchant-signup.component';

describe('MicroMerchantSignupComponent', () => {
  let component: MicroMerchantSignupComponent;
  let fixture: ComponentFixture<MicroMerchantSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MicroMerchantSignupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MicroMerchantSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
