import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Table } from 'primeng/table';
import { SharedService } from 'src/app/shared/shared.service';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-sp-profiles',
  templateUrl: './sp-profiles.component.html',
  styleUrls: ['./sp-profiles.component.scss']
})
export class SpProfilesComponent implements OnInit {

  createUpdateText = 'create';
  countries = [];
  breadCrumbItems: Array<{}>;
  loading = false;
  selectedProfile: any;
  selectedProfiles = [];
  @ViewChild('dtProfiles') table: Table;


  constructor(private router: Router,
              private modalService: NgbModal, private sharedService: SharedService, private adminService: AdminService) { }

  ngOnInit(): void {
    this.getAllCountries();
  }

  getAllCountries(): void {
    this.loading = true;
    this.adminService.getAllCountries().subscribe((countries) => {
      this.loading = false;
      this.countries = countries;
    },
      error => {
        this.loading = false;
        this.sharedService.sendErrorToastNotification(error);
      });
  }

  addNewCountry(scrollDataModal: any): void {
    this.selectedProfile = undefined;
    this.createUpdateText = 'Create New';
    this.modalService.open(scrollDataModal, { scrollable: true });
  }

  updateCountry(scrollDataModal: any, uid): void {
    this.selectedProfile = uid;
    this.createUpdateText = 'Update';
    this.modalService.open(scrollDataModal, { scrollable: true });
  }

  deleteSelectedCountries(): void {
    this.adminService.batchDeleteCountries(this.selectedProfiles).then((res) => {
      this.sharedService.sendSuccessToastNotification('Countries deleted successfully');
      return res;
    }).catch((err) => {
      this.sharedService.sendErrorToastNotification(err);
    });
  }

  childComponentMessage(message): void {
    this.modalService.dismissAll();
    if (message.type === 'success') {
      this.sharedService.sendSuccessToastNotification(message.msg);
    } else if (message.type === 'error') {
      this.sharedService.sendErrorToastNotification(message.msg);
    }
  }

  goToState(countryUID): void {
    this.router.navigate(['/admin/states'], {
      queryParams: { cid: countryUID},
    });
  }
}
