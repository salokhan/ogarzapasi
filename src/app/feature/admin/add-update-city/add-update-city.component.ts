import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { SharedService } from 'src/app/shared/shared.service';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-add-update-city',
  templateUrl: './add-update-city.component.html',
  styleUrls: ['./add-update-city.component.scss']
})
export class AddUpdateCityComponent implements OnInit {


  loading = false;
  cityForm: FormGroup;
  submitted = false;
  @Input() selectedRecord;
  @Input() countryUID;
  @Input() stateUID;
  @Output() outputMessage: EventEmitter<any> = new EventEmitter<any>();
  constructor(private adminService: AdminService, private sharedService: SharedService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.cityForm = new FormGroup({
      cityName: new FormControl('', [Validators.required]),
    });
    this.updateForm();
  }
  closeModal(): void {
    this.modalService.dismissAll();
  }

  updateForm(): void {
    if (this.cityForm && this.selectedRecord) {
      this.cityForm.controls.cityName.setValue(this.selectedRecord.cityName);
    }
  }
  saveCity(): void {
    this.submitted = true;
    if (this.cityForm.valid) {
      const newCity = {
        cityName: this.cityForm.controls.cityName.value
      };
      if (this.selectedRecord) {
        this.loading = true;
        this.adminService.updateCountryStateCity(this.countryUID, this.stateUID, this.selectedRecord.uid, newCity.cityName)
          .then(
            data => {
              this.outputMessage.emit({ type: 'success', msg: 'City updated successfully' });
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
        this.adminService.addCityToCountryState(this.countryUID,this.stateUID, newCity).then((data) => {
          this.adminService.getCityByCountryStateAndCityID(this.countryUID, this.stateUID, data.id).subscribe((service) => {
            this.outputMessage.emit({ type: 'success', msg: 'City added successfully' });
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
  get f(): any { return this.cityForm.controls; }

}

