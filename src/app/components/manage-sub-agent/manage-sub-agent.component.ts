import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../ApiService/api.service';
import { CommonModule } from '@angular/common';
import { NewDialogComponent } from './new-dialog/new-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DatasharingService } from '../../services/datasharing.service';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-manage-sub-agent',
  standalone: true,
  imports: [CommonModule, SpinnerComponent],
  templateUrl: './manage-sub-agent.component.html',
  styleUrl: './manage-sub-agent.component.scss',
})
export class ManageSubAgentComponent implements OnInit {
  constructor(
    private apiService: ApiService,
    private dialog: MatDialog,
    private dataSharing: DatasharingService
  ) {}

  subAgentData: any;
  ngOnInit(): void {
    this.getSubagentData();
  }



  getSubagentData() {
    this.dataSharing.show();
    this.apiService.getSubAgent().subscribe({
      next: (res) => {
        if (res?.responseCode == 200) {
          this.dataSharing.hide();
          this.subAgentData = res?.data;
        }
      },
      error: () => {
        this.dataSharing.hide();
        alert('Error Try Again!!!');
      },
    });
  }

  onClickView(row: any) {
    let dialogRef = this.dialog
      .open(NewDialogComponent, {
        width: '400px',
        panelClass: 'custom-dialog-container',
        data: row,
      })
      .afterClosed()
      .subscribe((res) => {
        this.getSubagentData();
      });
  }

  delete(value:any){
    this.dataSharing.show()
  this.apiService.deleteSubAgent(value?.id).subscribe({
    next:(res)=>{
      if(res?.responseCode == 200){
        this.dataSharing.hide();
        alert('Sub Agent Deleted Successfully')
        // this.dialog.close()
        this.getSubagentData();
      }else{
        this.dataSharing.hide();
        alert('Error While Deleting!!!')
      }
    },error:()=>{
      this.dataSharing.hide();
      alert('Error While Deleting!!!')
    }
  })
  }
}
