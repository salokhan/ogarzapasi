import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Table } from 'primeng/table';
import { SharedService } from 'src/app/shared/shared.service';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-cities-list',
  templateUrl: './cities-list.component.html',
  styleUrls: ['./cities-list.component.scss']
})
export class CitiesListComponent implements OnInit {
  createUpdateText = 'create';
  cities = [];
  breadCrumbItems: Array<{}>;
  loading = false;
  selectedCity: any;
  selectedCities = [];
  countryUID;
  stateUID;
  @ViewChild('dtCities') table: Table;


  constructor(private actRoute: ActivatedRoute,
    private modalService: NgbModal, private sharedService: SharedService, private adminService: AdminService) { }

  ngOnInit(): void {
    this.actRoute.queryParamMap.subscribe(params => {
      this.countryUID = params.get('cid');
      this.stateUID = params.get('sid');
      if (this.countryUID && this.stateUID) {
        this.getAllCitiesByCountry();
      }
    });
  }

  getAllCitiesByCountry(): void {
    this.loading = true;
    this.adminService.getAllCitiesOfStatenCountry(this.countryUID, this.stateUID).subscribe((cities) => {
      this.loading = false;
      this.cities = cities;
    },
      error => {
        this.loading = false;
        this.sharedService.sendErrorToastNotification(error);
      });
  }

  addNewCityInCountry(scrollDataModal: any): void {
    this.selectedCity = undefined;
    this.createUpdateText = 'Create New';
    this.modalService.open(scrollDataModal, { scrollable: true });
  }

  updateCountryCity(scrollDataModal: any, uid): void {
    this.selectedCity = uid;
    this.createUpdateText = 'Update';
    this.modalService.open(scrollDataModal, { scrollable: true });
  }

  deleteSelectedCitiesFromCountry(): void {
    this.adminService.batchDeleteCountryStatCities(this.countryUID, this.stateUID, this.selectedCities).then((res) => {
      this.sharedService.sendSuccessToastNotification('Cities deleted successfully');
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
}
