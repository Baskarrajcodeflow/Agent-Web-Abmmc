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

  downloadPDF(): void {
    const element = this.receiptContent.nativeElement;
    html2canvas(element, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', [80, 170]); 
            const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('receipt.pdf');
    });
  }
  async sharePDF(): Promise<void> {
    const element = this.receiptContent.nativeElement;

    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF('p', 'mm', [80, 200]);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

    const pdfBlob = pdf.output('blob');

    const file = new File([pdfBlob], 'receipt.pdf', { type: 'application/pdf' });

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({
        title: 'Receipt PDF',
        text: 'Here is your receipt.',
        files: [file]
      });
    } else {
      alert('Sharing not supported on this device/browser.');
    }
  }
}
