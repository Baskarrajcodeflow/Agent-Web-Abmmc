import { CommonModule } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-transaction-dialog',
  standalone: true,
  imports: [MatDialogModule,CommonModule,MatIconModule],
  templateUrl: './transaction-dialog.component.html',
  styleUrl: './transaction-dialog.component.scss',
})
export class TransactionDialogComponent implements OnInit {
  firstName:any
  lastname:any
  accountNo:any
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private dialogRef:MatDialogRef<TransactionDialogComponent>) {}
  ngOnInit(): void {
    console.log(this.data);
    this.firstName = sessionStorage.getItem('firstname')
    this.lastname = sessionStorage.getItem('lastname')
    this.accountNo = sessionStorage.getItem('profileWalletNo')
  }
  closeDialog(){
    this.dialogRef.close()
  }

  @ViewChild('receiptContent', { static: false }) receiptContent!: ElementRef;
  @ViewChild('receiptContentStock', { static: false }) receiptContentStock!: ElementRef;

  downloadPDF(param:any): void {
    let element:any
    if(param == 'receiptContent'){
      element = this.receiptContent.nativeElement;
    }else if(param == 'receiptContentStock'){
       element = this.receiptContentStock.nativeElement;
    }
    html2canvas(element, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', [80, 170]); 
            const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('receipt.pdf');
    });
  }
  async sharePDF(param:any): Promise<void> {
    let element:any
    if(param == 'receiptContent'){
      element = this.receiptContent.nativeElement;
    }else if(param == 'receiptContentStock'){
       element = this.receiptContentStock.nativeElement;
    }  
    const canvas = await html2canvas(element, { scale: 2 });
  
    canvas.toBlob(async (blob) => {
      if (!blob || blob.size === 0) {
        alert('Failed to generate image. Blob is empty.');
        return;
      }
  
      const file = new File([blob], 'receipt.png', { type: 'image/png' });
  
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({
            title: 'Receipt Image',
            text: 'Here is your receipt as an image.',
            files: [file],
          });
        } catch (error) {
          console.error('Sharing failed:', error);
        }
      } else {
        // Optional: Fallback download
        const link = document.createElement('a');
        link.href = URL.createObjectURL(file);
        link.download = 'receipt.png';
        link.click();
      }
    }, 'image/png');
  }
  
  
}
