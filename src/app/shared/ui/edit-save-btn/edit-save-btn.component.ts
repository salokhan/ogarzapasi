import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-locate-edit-save-btn',
  templateUrl: './edit-save-btn.component.html',
  styleUrls: ['./edit-save-btn.component.scss']
})
export class EditSaveBtnComponent implements OnInit {
  isEditable = true;
  @Input() formName: string;
  @Output() buttonClicked: EventEmitter<{}> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  editClick() {
    this.isEditable = false;
    this.buttonClicked.emit({ Button: 'EDIT', Form: this.formName});
  }
  saveClick() {
    this.isEditable = true;
    this.buttonClicked.emit({ Button: 'SAVE', Form: this.formName});
  }

}
