import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { SharedService } from 'src/app/shared/shared.service';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-add-update-sp-profiles-by-admin',
  templateUrl: './add-update-sp-profiles-by-admin.component.html',
  styleUrls: ['./add-update-sp-profiles-by-admin.component.scss']
})
export class AddUpdateSpProfilesByAdminComponent implements OnInit {

  loading = false;
  profileForm: FormGroup;
  submitted = false;
  @Input() selectedRecord;
  @Output() outputMessage: EventEmitter<any> = new EventEmitter<any>();
  constructor(private adminService: AdminService, private sharedService: SharedService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.profileForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      shopAddress: new FormControl('', [Validators.required]),
      contactNumbers: new FormControl('', [Validators.required]),
    });
    this.updateForm();
  }
  closeModal(): void {
    this.modalService.dismissAll();
  }

  updateForm(): void {
    if (this.profileForm && this.selectedRecord) {
      this.profileForm.controls.countryName.setValue(this.selectedRecord.countryName);
    }
  }
  saveCountry(): void {
    this.submitted = true;
    if (this.profileForm.valid) {
      const newCountry = {
        countryName: this.profileForm.controls.countryName.value
      };
      if (this.selectedRecord) {
        this.loading = true;
        this.adminService.updateCountry(this.selectedRecord.uid, newCountry.countryName)
          .then(
            data => {
              this.outputMessage.emit({ type: 'success', msg: 'Country updated successfully' });
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
        this.adminService.addCountry(newCountry).then((data) => {
          this.adminService.getCountryByID(data.id).subscribe((service) => {
            this.outputMessage.emit({ type: 'success', msg: 'Country added successfully' });
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
  get f(): any { return this.profileForm.controls; }

}

