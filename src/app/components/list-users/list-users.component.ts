import { Component } from '@angular/core';
import { ApiService } from '../../ApiService/api.service';
import { CommonModule, DatePipe } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx-js-style';
import saveAs from 'file-saver';
import autoTable from 'jspdf-autotable';
import { LoaderComponent } from "../loader/loader.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-users',
  standalone: true,
  imports: [CommonModule,
    MatMenuModule,
    MatIconModule, LoaderComponent,FormsModule],
  providers:[DatePipe],
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.scss'
})
export class ListUsersComponent {
listUsers: any;
isLoading:boolean = false
constructor(
      private loginService: ApiService,
      private datePipe: DatePipe
){}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
this.isLoading = true
    this.loginService
      .getSubAgentsByAgent()
      .subscribe({
        next: (res) => {
          if (res) {
            this.isLoading = false
            this.listUsers = res
            console.log(this.listUsers);
            
          }else{
            this.isLoading = false
            alert(res)
          }
        },
        error: () => {
          this.isLoading = false
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
      doc.text('Self Registration Statement', 380, 30);
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
        startY + 2 * lineSpacing
      );
      doc.text(
        `Email: ${sessionStorage.getItem('email')}`,
        startX,
        startY + 4 * lineSpacing
      );
      doc.text(
        `User Type: ${sessionStorage.getItem('userType')}`,
        startX,
        startY + 6 * lineSpacing
      );
    };

    // Call the header for the first page explicitly
    addHeader(null);

    // Define table columns and data
    const columns = [
      { header: 'Created_Date', dataKey: 'createdOn' },
      { header: 'FirstName	', dataKey: 'firstName' },
      { header: 'LastName	', dataKey: 'lastName' },
      { header: 'PhoneNo', dataKey: 'phone' },
      { header: 'Email', dataKey: 'email' },
      { header: 'Gender', dataKey: 'gender' },
      { header: 'AccountNo', dataKey: 'accountNo' },
      { header: 'Account_State', dataKey: 'accountState' },
      { header: 'Agent_Type', dataKey: 'agentType' },
    ];


    const data = this.listUsers.map((user: any) => ({
      ...user,
      createdOn: this.datePipe.transform(user.createdOn, 'medium') || '',
      accountNo: user?.walletAccount?.accountNo || '',
    }));
    
    console.log(data);
    
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
        fontSize: 7,
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
    doc.save('Self-Registration-report.pdf');
  }

    exportToExcel() {
      // Helper function to create styled cell objects
      const createStyledCell = (value: any, styles: any) => ({
        v: value,
        s: styles,
      });
  
      // Define header rows with color styling
      const headerRows = [
        [
          createStyledCell('Afghan Besim Mobile Money Company,', {
            fill: { fgColor: { rgb: 'FFAE19' } },
            font: { color: { rgb: '000000' } },
          }),
        ],
        [
          createStyledCell('Darulaman Road, Hajiari Najari,', {
            fill: { fgColor: { rgb: 'FFAE19' } },
            font: { color: { rgb: '000000' } },
          }),
        ],
        [
          createStyledCell('KABUL, AFGHANISTAN', {
            fill: { fgColor: { rgb: 'FFAE19' } },
            font: { color: { rgb: '000000' } },
          }),
        ],
        [],
        [
          createStyledCell('Self Registration Report', {
            font: { bold: true },
            fill: { fgColor: { rgb: 'BDD7EE' } },
          }),
        ],
        [
          `User Name: ${sessionStorage.getItem('firstname')} ${sessionStorage.getItem('lastname')}`,
        ],
        [
          `Email: ${sessionStorage.getItem('email')}`,
        ],
        [
          `User Type: ${sessionStorage.getItem('userType')}`,
        ],
        [],
      ];
  
      // Define table headers with color styling
      const tableHeaders = [
        [
          createStyledCell('Created Date', {
            font: { bold: true },
            fill: { fgColor: { rgb: 'A9D08E' } },
          }),
          createStyledCell('Agent Type', {
            font: { bold: true },
            fill: { fgColor: { rgb: 'A9D08E' } },
          }),
          createStyledCell('First Name', {
            font: { bold: true },
            fill: { fgColor: { rgb: 'A9D08E' } },
          }),
          createStyledCell('Last Name', {
            font: { bold: true },
            fill: { fgColor: { rgb: 'A9D08E' } },
          }),
          createStyledCell('PhoneNo', {
            font: { bold: true },
            fill: { fgColor: { rgb: 'A9D08E' } },
          }),
          createStyledCell('Email', {
            font: { bold: true },
            fill: { fgColor: { rgb: 'A9D08E' } },
          }),
          createStyledCell('Account State', {
            font: { bold: true },
            fill: { fgColor: { rgb: 'A9D08E' } },
          }),
          createStyledCell('Account No', {
            font: { bold: true },
            fill: { fgColor: { rgb: 'A9D08E' } },
          }),
        ],
      ];
  
      // Convert transactions to a basic format (without specific styling)
      const transactionRows = this.listUsers.map((tx: any) => [
        tx.createdOn,
        tx.agentType,
        tx.firstName,
        tx.lastName,
        tx.phone,
        tx.email,
        tx.accountState,
        tx.walletAccount.accountNo
      ]);
  

  
      // Combine all rows
      const worksheetData = [
        ...headerRows,
        ...tableHeaders,
        ...(transactionRows || []),
      ];
  
      // Create worksheet and workbook
      const worksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(worksheetData);
      worksheet['!cols'] = [
        { wch: 35 },
        { wch: 30 },
        { wch: 30 },
        { wch: 20 },
        { wch: 20 },
        { wch: 20 },
        { wch: 20 },
        { wch: 20 },
      ];
  
      const workbook: XLSX.WorkBook = {
        Sheets: { Statement: worksheet },
        SheetNames: ['Statement'],
      };
  
      // Write the workbook and trigger download
      XLSX.writeFile(workbook, `Self-Registration-Report.xlsx`);
    }

     exportToCSV() {
        // Define header rows for the CSV file
        const headerRows = [
          ['Afghan Besim Mobile Money Company,'],
          ['Darulaman Road, Hajiari Najari,'],
          ['KABUL, AFGHANISTAN'],
          [],
          ['Self-Registration Report'],
          [
            `User Name: ${sessionStorage.getItem('firstname')} ${sessionStorage.getItem('lastname')}`,
          ],
          [
            `Email: ${sessionStorage.getItem('email')}`,
          ],
          [
            `User Type: ${sessionStorage.getItem('userType')}`,
          ],
          [],
        ];
    
        // Define column headers for the transaction table
        const tableHeaders = [
          [
            'Created Date',
            'User Type',
            'First Name',
            'Last Name',
            'Phone',
            'Email',
            'Account State',
            'Account No',
          ],
        ];
    
        const transactionRows = this.listUsers.map((tx: any) => [
          tx.createdOn,
          tx.agentType,
          tx.firstName,
          tx.lastName,
          tx.phone,
          tx.email,
          tx.accountState,
          tx.walletAccount.accountNo
        ]);
    
 
    
        // Combine all rows for the CSV file
        const csvData = [
          ...headerRows,
          ...tableHeaders,
          ...transactionRows,
        ];
    
        // Create a worksheet for CSV
        const worksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(csvData);
    
        // Apply the column width to create spacing if needed
        worksheet['!cols'] = [
          { wch: 30 }, // Adjust width as needed for alignment
          { wch: 30 },
          { wch: 30 },
          { wch: 20 },
          { wch: 20 },
          { wch: 20 },
          { wch: 20 },
          { wch: 20 },
        ];
        // Write to CSV format
        const csv = XLSX.utils.sheet_to_csv(worksheet);
    
        // Create a Blob from the CSV data and trigger download
        const csvBlob: Blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        saveAs(csvBlob, `Self-Registration-Report.csv`);
      }


      isModalOpen = false;
      userInput: string = '';
    
      openModal() {
        this.isModalOpen = true;
      }
    
      closeModal() {
        this.isModalOpen = false;
      }
    
      submit() {
        console.log('Submitted text:', this.userInput);
        this.closeModal();
      }
}
