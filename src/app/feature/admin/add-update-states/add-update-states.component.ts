import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { SharedService } from 'src/app/shared/shared.service';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-add-update-states',
  templateUrl: './add-update-states.component.html',
  styleUrls: ['./add-update-states.component.scss']
})
export class AddUpdateStatesComponent implements OnInit {

  loading = false;
  stateForm: FormGroup;
  submitted = false;
  @Input() selectedRecord;
  @Input() countryUID;
  @Output() outputMessage: EventEmitter<any> = new EventEmitter<any>();
  constructor(private adminService: AdminService, private sharedService: SharedService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.stateForm = new FormGroup({
      stateName: new FormControl('', [Validators.required]),
    });
    this.updateForm();
  }
  closeModal(): void {
    this.modalService.dismissAll();
  }

  updateForm(): void {
    if (this.stateForm && this.selectedRecord) {
      this.stateForm.controls.stateName.setValue(this.selectedRecord.stateName);
    }
  }
  saveState(): void {
    this.submitted = true;
    if (this.stateForm.valid) {
      const newState = {
        stateName: this.stateForm.controls.stateName.value
      };
      if (this.selectedRecord) {
        this.loading = true;
        this.adminService.updateCountryState(this.countryUID, this.selectedRecord.uid, newState.stateName)
          .then(
            data => {
              this.outputMessage.emit({ type: 'success', msg: 'State updated successfully' });
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
        this.adminService.addStateToCountry(this.countryUID, newState).then((data) => {
          this.adminService.getStateByCountryAndStateID(this.countryUID, data.id).subscribe((service) => {
            this.outputMessage.emit({ type: 'success', msg: 'State added successfully' });
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
  get f(): any { return this.stateForm.controls; }

}

