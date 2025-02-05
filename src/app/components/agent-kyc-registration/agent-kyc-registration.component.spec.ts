import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentKycRegistrationComponent } from './agent-kyc-registration.component';

describe('AgentKycRegistrationComponent', () => {
  let component: AgentKycRegistrationComponent;
  let fixture: ComponentFixture<AgentKycRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentKycRegistrationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgentKycRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
