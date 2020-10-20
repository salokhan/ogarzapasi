import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/shared/shared.service';
import { AdminService } from '../admin.service';
import { FilterUtils } from 'primeng/utils';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit, OnDestroy {

  tags: any[];
  filteredTags: any[];
  breadCrumbItems: Array<{}>;

  selectedTag;
  errorMessage: any;
  loading = false;
  createUpdateText = 'Create';
  operationDOneNotificationSubscription: Subscription;

  constructor(private modalService: NgbModal, private sharedService: SharedService, private adminService: AdminService) { }


  ngOnDestroy(): void {
    this.operationDOneNotificationSubscription.unsubscribe();
  }
  getAllTags(): void {
    this.loading = true;
    this.adminService.getAllTags().subscribe((tags) => {
      this.tags = tags;
      this.filteredTags = this.tags;
      this.loading = false;
    },
      error => {
        this.errorMessage = error;
        this.loading = false;
        this.sharedService.sendErrorToastNotification(error);
      });
  }
  ngOnInit(): void {
    this.getAllTags();
  }

  filterWithContains(event): void {
    if (event.data && event.srcElement.value) {
      this.filteredTags = FilterUtils.filter(this.tags, ['tag'], event.srcElement.value, 'contains');
    } else if (!event.data) {
      this.filteredTags = this.tags;
    }
  }

  createNewTag(scrollDataModal: any): void {
    this.selectedTag = undefined;
    this.createUpdateText = 'Create New';
    this.modalService.open(scrollDataModal, { scrollable: true });
  }

  onEditTagClicked(event, scrollDataModal): void {
    this.modalService.open(scrollDataModal, { scrollable: true });
    this.createUpdateText = 'Update';
    this.selectedTag = event;
  }

  onDeleteTagClicked(event): void {
    this.deleteTag([event]);
  }

  deleteTag(selectedUserID): void {
    this.loading = true;
    this.adminService.batchDeleteTags(selectedUserID).then((res) => {
      this.sharedService.sendSuccessToastNotification('Tag deleted successfully');
      this.loading = false;
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
