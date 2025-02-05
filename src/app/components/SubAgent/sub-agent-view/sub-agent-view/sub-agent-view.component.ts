import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { MiPayAgent, UserManagementService } from '../../openapi';
import { ApiService } from '../../../../ApiService/api.service';

@Component({
  selector: 'app-sub-agent-view',
  standalone: true,
  imports : [ReactiveFormsModule,NgFor,NgIf],
  templateUrl: './sub-agent-view.component.html',
  styleUrls: ['./sub-agent-view.component.css']
})
export class SubAgentViewComponent {

  @Input() backOffice?: MiPayAgent;
  @Output() save = new EventEmitter<MiPayAgent>();
  @Output() cancel = new EventEmitter<void>();
  @Output() saveParentId = new EventEmitter<any>();

  subAgentForm: FormGroup;
  agents!: MiPayAgent[];
  parentId: any;
  agentName: any;
  isActiveAgentDropDown: boolean = false;

  constructor(private fb: FormBuilder, private boService: UserManagementService,private subAgentService:ApiService) {
    this.subAgentForm = this.fb.group({
      userType: "AGENT",
      agentType: "SUBAGENT",
      accountType: "AGENT",
      companyName: ['', Validators.required],
      licenseNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{9,}$/)]],
      commissionPercentage: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    this.boService.getAllAgents().subscribe({
      next: (usrs: any) => {
        this.agents = usrs;
      }
    });
    this.setBackOfficeForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['backOffice'] && changes['backOffice'].currentValue) {
      this.setBackOfficeForm();
    }
  }

  setBackOfficeForm() {
    if (this.backOffice) {
      this.subAgentForm.patchValue(this.backOffice);
    }
  }

  onSelectAgent(event: any) {
    this.parentId = event.target.value;
    for (let item of this.agents) {
      if (this.parentId == item?.id) {
        this.agentName = item?.parent;
        this.isActiveAgentDropDown = true;
      }
    }
  }

  onSave() {
    let parentAgentId = sessionStorage.getItem('UserId')
    this.subAgentService.registerSubAgent(this.subAgentForm.value,parentAgentId).subscribe({
      next:(a:any)=>{
        if (a) {
          alert("Sub agent created successfully")
        }
        else{
          alert("Something went wrong")
        }
      }
    })
  }

  onCancel() {
    this.cancel.emit();
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }
}
