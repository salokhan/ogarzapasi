import { Component, OnInit, Input, OnChanges, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit, OnChanges {

  @Input() tag: any;
  @Output() editTagClicked: EventEmitter<{}> = new EventEmitter();
  @Output() deleteTagClicked: EventEmitter<{}> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    console.log('tag');
  }

  editClicked(): void {
    this.editTagClicked.emit(this.tag);
  }

  deleteClicked(): void {
    this.deleteTagClicked.emit(this.tag);

  }


}
