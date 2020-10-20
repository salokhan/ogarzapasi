import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { SharedService } from 'src/app/shared/shared.service';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-add-update-tag',
  templateUrl: './add-update-tag.component.html',
  styleUrls: ['./add-update-tag.component.scss']
})
export class AddUpdateTagComponent implements OnInit {

  loading = false;
  tagForm: FormGroup;
  submitted = false;
  @Input() selectedRecord;
  @Output() outputMessage: EventEmitter<any> = new EventEmitter<any>();
  constructor(private adminService: AdminService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.tagForm = new FormGroup({
      tag: new FormControl('', [Validators.required]),
    });
    this.updateForm();
  }
  closeModal(): void {
    this.modalService.dismissAll();
  }

  updateForm(): void {
    if (this.tagForm && this.selectedRecord) {
      this.tagForm.controls.tag.setValue(this.selectedRecord.tag);
    }
  }
  saveTag(): void {
    this.submitted = true;
    if (this.tagForm.valid) {
      const newTag = {
        tag: this.tagForm.controls.tag.value
      };
      if (this.selectedRecord) {
        this.loading = true;
        this.adminService.updateTag(this.selectedRecord.uid, newTag.tag)
          .then(
            data => {
              this.outputMessage.emit({ type: 'success', msg: 'Tag updated successfully' });
              this.loading = false;
            },
            (error) => {
              this.outputMessage.emit({ type: 'error', msg: error });
              this.loading = false;
            }).catch((err) => {
              this.outputMessage.emit({ type: 'error', msg: err });
              this.loading = false;
            });
      } else {
        this.loading = true;
        this.adminService.addTag(newTag).then((data) => {
          this.adminService.getTagByID(data.id).subscribe((service) => {
            this.outputMessage.emit({ type: 'success', msg: 'Tag added successfully' });
            this.loading = false;
            this.selectedRecord = service;
          }, (error) => {
            this.outputMessage.emit({ type: 'error', msg: error });
            this.loading = false;

          });
        }).catch((err) => {
          this.outputMessage.emit({ type: 'error', msg: err });
          this.loading = false;
        });
      }
    }
  }

  // convenience getter for easy access to form fields
  get f(): any { return this.tagForm.controls; }

}

