import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { SharedService } from 'src/app/shared/shared.service';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-add-update-country',
  templateUrl: './add-update-country.component.html',
  styleUrls: ['./add-update-country.component.scss']
})
export class AddUpdateCountryComponent implements OnInit {

  loading = false;
  countryForm: FormGroup;
  submitted = false;
  @Input() selectedRecord;
  @Output() outputMessage: EventEmitter<any> = new EventEmitter<any>();
  constructor(private adminService: AdminService, private sharedService: SharedService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.countryForm = new FormGroup({
      countryName: new FormControl('', [Validators.required]),
    });
    this.updateForm();
  }
  closeModal(): void {
    this.modalService.dismissAll();
  }

  updateForm(): void {
    if (this.countryForm && this.selectedRecord) {
      this.countryForm.controls.countryName.setValue(this.selectedRecord.countryName);
    }
  }
  saveCountry(): void {
    this.submitted = true;
    if (this.countryForm.valid) {
      const newCountry = {
        countryName: this.countryForm.controls.countryName.value
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
  get f(): any { return this.countryForm.controls; }

}

