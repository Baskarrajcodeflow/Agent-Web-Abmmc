import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BundleItem, BundleList } from '../../../../interfaces/interfaces';
import { SpinnerService } from '../../../spinner/spinner.service';
import { ApiService } from '../../../../ApiService/api.service';

@Component({
  selector: 'app-bundle-list',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './bundle-list.component.html',
  styleUrl: './bundle-list.component.scss'
})



export class BundleListComponent {

  bundles: BundleList[] = [];
  
  
  searchTerm: string = '';
  activeTab = 'data'
  dataBundles: BundleItem[] = [];
  voiceBundles: BundleItem[] = [];
  bundleList: BundleItem[] = [];
  constructor(
     @Inject(MAT_DIALOG_DATA) public data: BundleList,
      private apiService: ApiService,
      private spinner: SpinnerService,
      private dialogRef: MatDialogRef<BundleListComponent>
  ) {
   
   }


  ngOnInit() {
    this.bundleList = this.data.dataBundle || []; 
  }

  tabChange() {
    if(this.activeTab === 'data'){
    this.bundleList = this.data.dataBundle || [];
    }
    else if(this.activeTab === 'voice'){
      this.bundleList = this.data.voiceBundle || [];
    }
  }

  SelectPlan(selectedBundle : BundleItem){
    console.log('Selected Bundle:', selectedBundle);
    this.dialogRef.close(selectedBundle);

  }


}
