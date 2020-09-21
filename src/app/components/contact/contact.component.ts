import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA)  public data,
  public dialogRef:MatDialogRef<ContactComponent>) { }

  ngOnInit(): void {
  }
close(){
  this.dialogRef.close();
}
}
