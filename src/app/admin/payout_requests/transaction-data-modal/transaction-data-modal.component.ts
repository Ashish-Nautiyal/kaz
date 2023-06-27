import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-transaction-data-modal',
  templateUrl: './transaction-data-modal.component.html',
  styleUrls: ['./transaction-data-modal.component.scss']
})
export class TransactionDataModalComponent {

  constructor(private dialogRef: MatDialogRef<TransactionDataModalComponent>) { }

  close() {
    this.dialogRef.close(false);
  }
}
