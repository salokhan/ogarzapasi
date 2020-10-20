import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Table } from 'primeng/table';
import { SharedService } from 'src/app/shared/shared.service';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-states-list',
  templateUrl: './states-list.component.html',
  styleUrls: ['./states-list.component.scss']
})
export class StatesListComponent implements OnInit {
  createUpdateText = 'create';
  states = [];
  breadCrumbItems: Array<{}>;
  loading = false;
  selectedState: any;
  selectedStates = [];
  countryUID;
  @ViewChild('dtStates') table: Table;


  constructor(private router: Router, private actRoute: ActivatedRoute,
              private modalService: NgbModal, private sharedService: SharedService, private adminService: AdminService) { }

  ngOnInit(): void {
    this.actRoute.queryParamMap.subscribe(params => {
      this.countryUID = params.get('cid');
      if (this.countryUID) {
        this.getAllStatesOfCOuntry();
      }
    });

  }

  getAllStatesOfCOuntry(): void {
    this.loading = true;
    this.adminService.getAllStateOfCountry(this.countryUID).subscribe((states) => {
      this.loading = false;
      this.states = states;
    },
      error => {
        this.loading = false;
        this.sharedService.sendErrorToastNotification(error);
      });
  }

  addNewStateInCountry(scrollDataModal: any): void {
    this.selectedState = undefined;
    this.createUpdateText = 'Create New';
    this.modalService.open(scrollDataModal, { scrollable: true });
  }

  updateCountryState(scrollDataModal: any, uid): void {
    this.selectedState = uid;
    this.createUpdateText = 'Update';
    this.modalService.open(scrollDataModal, { scrollable: true });
  }

  deleteSelectedStatesFromCountry(): void {
    this.adminService.batchDeleteCountryStates(this.countryUID, this.selectedStates).then((res) => {
      this.sharedService.sendSuccessToastNotification('States deleted successfully');
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

  goToCity(stateUID): void {
    this.router.navigate(['/admin/cities'], {
      queryParams: { cid: this.countryUID, sid: stateUID },
    });
  }
}
