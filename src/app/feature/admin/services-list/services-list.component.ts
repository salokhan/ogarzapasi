import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Table } from 'primeng/table';
import { SharedService } from 'src/app/shared/shared.service';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.scss']
})
export class ServicesListComponent implements OnInit {

  createUpdateText = 'create';
  services = [];
  breadCrumbItems: Array<{}>;
  loading = false;
  selectedService: any;
  selectedServices = [];
  @ViewChild('dtServices') table: Table;


  constructor(private modalService: NgbModal, private sharedService: SharedService, private adminService: AdminService) { }

  ngOnInit(): void {
    this.getAllServices();
  }

  getAllServices(): void {
    this.loading = true;
    this.adminService.getAllServices().subscribe((services) => {
      this.loading = false;
      this.services = services;
    },
      error => {
        this.loading = false;
        this.sharedService.sendErrorToastNotification(error);
      });
  }

  addNewService(scrollDataModal: any): void {
    this.selectedService = undefined;
    this.createUpdateText = 'Create New';
    this.modalService.open(scrollDataModal, { scrollable: true });
  }

  updateService(scrollDataModal: any, uid): void {
    this.selectedService = uid;
    this.createUpdateText = 'Update';
    this.modalService.open(scrollDataModal, { scrollable: true });
  }

  deleteSelectedService(): void {
    this.adminService.batchDeleteServices(this.selectedServices).then((res) => {
      this.sharedService.sendSuccessToastNotification('Service deleted successfully');
      return res;
    }).catch((err) => {
      this.sharedService.sendErrorToastNotification(err);
    });
  }

  childComponentMessage(message): void {
    if (message.type === 'success') {
      this.sharedService.sendSuccessToastNotification(message.msg);
    } else if (message.type === 'error') {
      this.sharedService.sendErrorToastNotification(message.msg);
    }
  }
}
