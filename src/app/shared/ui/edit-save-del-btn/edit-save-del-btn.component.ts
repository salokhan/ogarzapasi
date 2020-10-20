import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-locate-edit-save-del-btn',
  templateUrl: './edit-save-del-btn.component.html',
  styleUrls: ['./edit-save-del-btn.component.scss']
})
export class EditSaveDelBtnComponent implements OnInit {
  isEditable = true;
  @Input() formName: string;
  @Output() buttonClicked: EventEmitter<{}> = new EventEmitter();
  @Output() delButtonClicked: EventEmitter<{}> = new EventEmitter();

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
  deleteClick() {
    this.isEditable = true;
    this.delButtonClicked.emit({ Button: 'DELETE', Form: this.formName});
  }

}
