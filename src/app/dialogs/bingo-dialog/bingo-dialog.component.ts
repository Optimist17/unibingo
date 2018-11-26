import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BingoDialogOptions } from './bingo-dialog-options';

@Component({
  selector: 'app-bingo-dialog',
  templateUrl: './bingo-dialog.component.html',
  styleUrls: ['./bingo-dialog.component.scss']
})
export class BingoDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<BingoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BingoDialogOptions
  ) { }

  ngOnInit() {
  }

  finish() {
    this.dialogRef.close();
  }

}
