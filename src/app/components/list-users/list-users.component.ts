import { Component } from '@angular/core';
import { ApiService } from '../../ApiService/api.service';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx-js-style';
import saveAs from 'file-saver';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-list-users',
  standalone: true,
  imports: [CommonModule,
    MatMenuModule,
        MatIconModule,
  ],
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.scss'
})
export class ListUsersComponent {
listUsers: any;

constructor(
      private loginService: ApiService,
){}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.loginService
      .getSubAgentsByAgent()
      .subscribe({
        next: (res) => {
          if (res) {
            this.listUsers = res
            console.log(this.listUsers);
            
          }
        },
        error: () => {
          alert('Error While Loading Data');
        },
      });
  }

  makePdf() {
    const doc = new jsPDF('p', 'pt', 'a4');

    // Function to add the header content
    const addHeader = (data: any) => {
      doc.addImage('../../../assets/images/logo.png', 'PNG', 40, 20, 50, 25);
      doc.setFontSize(8);
      doc.setTextColor(40);
      doc.text('Afghan Besim Mobile Money Company,', 40, 60);
      doc.text('Darulaman Road, Hajari Najari,', 40, 72);
      doc.text('KABUL, AFGHANISTAN', 40, 84);

      doc.setFontSize(10);
      doc.setTextColor('#f47a20');
      doc.text('Transaction History Statement', 380, 30);
      const startX = 380;
      const startY = 35;
      const lineSpacing = 5;

      doc.setFontSize(8);
      doc.setTextColor(40);
      // const fromDate = this.transactionHitoryForm.controls['fromDate'].value;
      // const toDate = this.transactionHitoryForm.controls['toDate'].value;
      // doc.text(
      //   `Statement Period: ${fromDate} to ${toDate}`,
      //   startX,
      //   startY + 2 * lineSpacing
      // );
      doc.text(
        `User Name: ${sessionStorage.getItem('firstname')} ${sessionStorage.getItem('lastname')}`,
        startX,
        startY + 4 * lineSpacing
      );
      doc.text(
        `Email: ${sessionStorage.getItem('email')}`,
        startX,
        startY + 6 * lineSpacing
      );
      doc.text(
        `User Type: ${sessionStorage.getItem('userType')}`,
        startX,
        startY + 8 * lineSpacing
      );
    };

    // Call the header for the first page explicitly
    addHeader(null);

    // Define table columns and data
    const columns = [
      { header: 'Created Date', dataKey: 'createdOn' },
      { header: 'User Type', dataKey: 'userType' },
      { header: 'First Name	', dataKey: 'firstName' },
      { header: 'Last Name	', dataKey: 'lastName' },
      { header: 'PhoneNo', dataKey: 'phone' },
      { header: 'Email', dataKey: 'email' },
      { header: 'Debit', dataKey: 'debitAmount' },
      { header: 'Credit', dataKey: 'creditAmount' },
    ];

    const data = this.listUsers;

    // Generate the table with autoTable
    autoTable(doc, {
      columns: columns,
      body: data,
      startY: 100, // Adjust this to start the table below the header
      didDrawPage: (data: any) => {
        // Call addHeader for each new page
        addHeader(data);
      },
      headStyles: {
        fillColor: [244, 122, 32],
        textColor: 255,
        fontSize: 10,
      },
      bodyStyles: {
        fontSize: 8,
      },
      margin: { top: 100 }, // Ensure the table doesn't overlap with the header
    });

    // // Add summary at the bottom of the page
    // const pageHeight = doc.internal.pageSize.height;
    // const footerY = pageHeight - 100; // Adjust Y position to be close to the bottom

    // doc.setFontSize(10);
    // doc.text('Total Credit:', 40, footerY);
    // doc.text(`${this.totalCredit.toFixed(2)}`, 150, footerY);

    // doc.text('Total Debit:', 40, footerY + 20);
    // doc.text(`${this.totalDebit.toFixed(2)}`, 150, footerY + 20);

    // doc.text('Total Credit Count:', 40, footerY + 40);
    // doc.text(`${this.totalCreditCount}`, 150, footerY + 40);

    // doc.text('Total Debit Count:', 40, footerY + 60);
    // doc.text(`${this.totalDebitCount}`, 150, footerY + 60);
    // Save the PDF
    doc.save('Transaction-History-report.pdf');
  }
}
