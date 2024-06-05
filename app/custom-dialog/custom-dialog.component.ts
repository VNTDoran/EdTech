import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-custom-dialog',
  templateUrl: './custom-dialog.component.html',
  styleUrls: ['./custom-dialog.component.css'],
})
export class CustomDialogComponent implements OnInit {
  @Output() optionSelected = new EventEmitter<any>();

  options: any[] = [
    { id: 1, name: 'Option 1' },
    { id: 2, name: 'Option 2' },
    { id: 3, name: 'Option 3' },
  ];

  constructor() {}

  ngOnInit(): void {}

  selectOption(option: any) {
    this.optionSelected.emit(option);
  }
}
