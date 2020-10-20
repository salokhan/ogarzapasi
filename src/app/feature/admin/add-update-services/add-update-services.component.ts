import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { SharedService } from 'src/app/shared/shared.service';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-add-update-services',
  templateUrl: './add-update-services.component.html',
  styleUrls: ['./add-update-services.component.scss']
})
export class AddUpdateServicesComponent implements OnInit {

  loading = false;
  serviceForm: FormGroup;
  submitted = false;
  @Input() selectedRecord;
  @Output() outputMessage: EventEmitter<any> = new EventEmitter<any>();
  constructor(private adminService: AdminService, private sharedService: SharedService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.serviceForm = new FormGroup({
      serviceName: new FormControl('', [Validators.required]),
    });
    this.updateForm();
  }
  closeModal(): void {
    this.modalService.dismissAll();
  }

  updateForm(): void {
    if (this.serviceForm && this.selectedRecord) {
      this.serviceForm.controls.serviceName.setValue(this.selectedRecord.serviceName);
    }
  }
  saveService(): void {
    this.submitted = true;
    if (this.serviceForm.valid) {
      const newService = {
        serviceName: this.serviceForm.controls.serviceName.value
      };
      if (this.selectedRecord) {
        this.loading = true;
        this.adminService.updateService(this.selectedRecord.uid, newService.serviceName)
          .then(
            data => {
              this.loading = false;
              this.outputMessage.emit({ type: 'success', msg: 'Service updated successfully' });
              this.modalService.dismissAll();
              // this.sharedService.sendSuccessToastNotification('Service updated successfully');
            },
            (error) => {
              this.loading = false;
              // this.sharedService.sendErrorToastNotification(error);
              this.outputMessage.emit({ type: 'error', msg: error });
              this.modalService.dismissAll();
            }).catch((err) => {
              this.loading = false;
              this.outputMessage.emit({ type: 'error', msg: err });
              this.modalService.dismissAll();
              // this.sharedService.sendErrorToastNotification(err);
            });
      } else {
        this.loading = true;
        this.adminService.addService(newService).then((data) => {
          this.adminService.getServiceByID(data.id).subscribe((service) => {
            this.loading = false;
            this.selectedRecord = service;
            this.outputMessage.emit({ type: 'success', msg: 'Service added successfully' });
            this.modalService.dismissAll();
            // this.sharedService.sendSuccessToastNotification('Service added successfully');
          }, (error) => {
            this.loading = false;
            this.outputMessage.emit({ type: 'error', msg: error });
            this.modalService.dismissAll();
            // this.sharedService.sendErrorToastNotification(error);

          });
        }).catch((err) => {
          this.loading = false;
          this.outputMessage.emit({ type: 'error', msg: err });
          this.modalService.dismissAll();
          // this.sharedService.sendErrorToastNotification(err);
        });
      }
    }
  }

  // convenience getter for easy access to form fields
  get f(): any { return this.serviceForm.controls; }

}
