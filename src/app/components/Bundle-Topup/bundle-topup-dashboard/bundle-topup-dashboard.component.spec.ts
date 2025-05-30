import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BundleTopupDashboardComponent } from './bundle-topup-dashboard.component';

describe('BundleTopupDashboardComponent', () => {
  let component: BundleTopupDashboardComponent;
  let fixture: ComponentFixture<BundleTopupDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BundleTopupDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BundleTopupDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
