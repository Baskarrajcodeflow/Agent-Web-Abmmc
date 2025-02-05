import { Component, Input } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { MiPayAgent, UserManagementService } from '../openapi';
import { SubAgentViewComponent } from '../sub-agent-view/sub-agent-view/sub-agent-view.component';


@Component({
  selector: 'app-sub-agent',
  standalone: true,
  imports: [NgFor, SubAgentViewComponent,NgIf],
  templateUrl: './sub-agent.component.html',
  styleUrl: './sub-agent.component.css'
})
export class SubAgentComponent {

  parent = {} as MiPayAgent;
  @Input() type!:string;
  parentId!: number;

  onCancel() {
    this.selected=undefined
  }
  onSaveParentId(parentId:number){
  this.parentId = parentId;
  }
  onSave(bo: MiPayAgent) {
    console.log('aaaaa');
    
    if(bo.id== undefined){
      this.subAgentService.registerSubAgent('',this.parentId,bo).subscribe({
        next:(a:any)=>{
          if (a) {
            alert("Sub agent created successfully")
          }
          else{
            alert("Something went wrong")
          }
          this.boUsers.push(a);
          this.selected = undefined;

        }
      })
    }else{
    this.subAgentService.editSubAgent('',this.parentId,bo).subscribe({
    next:(a:any)=>{
      if(a){
        alert("Sub agent edit successfull")
      }
      else{
        alert("Something went wrong")
      }
      this.boUsers.filter(o => o.id != a.id).push(a);
      this.selected = undefined;
      }
  })
    
    }
  }
  
  onUserClick(_t19: MiPayAgent) {
    this.selected =  _t19;    
  }
  constructor(private subAgentService: UserManagementService){}
  boUsers !:MiPayAgent[]
  selected: MiPayAgent | undefined = undefined;
    ngOnInit(): void {
      this.subAgentService.getAllSubAgents().subscribe({
        next:(usrs: MiPayAgent[])=>{
          this.boUsers = usrs;
        }
      })
    }
    onAdd(event: any) {
      this.selected = { ...{ id: undefined },...this.parent};
    }
  }