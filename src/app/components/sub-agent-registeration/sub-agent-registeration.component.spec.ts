import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubAgentRegisterationComponent } from './sub-agent-registeration.component';

describe('SubAgentRegisterationComponent', () => {
  let component: SubAgentRegisterationComponent;
  let fixture: ComponentFixture<SubAgentRegisterationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubAgentRegisterationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubAgentRegisterationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
