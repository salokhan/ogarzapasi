import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { MessageService } from 'primeng/api/';
import { SharedService } from '../shared/shared.service';
import { Subscription } from 'rxjs';
import { first, last } from 'rxjs/operators';



@Component({
  selector: 'app-locate-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  providers: [MessageService]
})
export class LayoutComponent implements OnInit, AfterViewInit, OnDestroy {

  toastSuccessNotificationSubscription: Subscription;
  toastInfoNotificationSubscription: Subscription;
  toastWarningNotificationSubscription: Subscription;
  toastErrorNotificationSubscription: Subscription;

  showMobileMenu = false;
  // constructor(private sharedService: SharedService) {
  constructor(private messageService: MessageService, private sharedService: SharedService) {

  }
  ngOnDestroy(): void {
    this.destroySubscription();
  }
  destroySubscription(): void {
    this.toastSuccessNotificationSubscription.unsubscribe();
    this.toastInfoNotificationSubscription.unsubscribe();
    this.toastWarningNotificationSubscription.unsubscribe();
    this.toastErrorNotificationSubscription.unsubscribe();
  }
  subscribeToNotification(): void {
    this.toastSuccessNotificationSubscription = this.sharedService.getSuccessToastNotification().subscribe((data) => {
      this.messageService.clear();
      this.ShowSuccessMessage(data);
    });
    this.toastInfoNotificationSubscription = this.sharedService.getInfoToastNotification().subscribe((data) => {
      this.messageService.clear();
      this.ShowInfoMessage(data);
    });
    this.toastWarningNotificationSubscription = this.sharedService.getWarningToastNotification().subscribe((data) => {
      this.messageService.clear();
      this.ShowWarningMessage(data);
    });
    this.toastErrorNotificationSubscription = this.sharedService.getErrorToastNotification().subscribe((data) => {
      this.messageService.clear();
      this.ShowErrorMessage(data);
    });
  }
  ngOnInit(): void {
    this.subscribeToNotification();

  }
  ShowInfoMessage(message): void {
    this.messageService.add({ key: 'success', severity: 'info', summary: 'Info Message', detail: message });
  }
  ShowErrorMessage(message): void {
    this.messageService.add({ severity: 'error', summary: 'Error Message', detail: message });
  }
  ShowWarningMessage(message): void {
    this.messageService.add({ severity: 'warn', summary: 'Warning Message', detail: message });
  }
  ShowSuccessMessage(message): void {
    this.messageService.add({ severity: 'success', summary: 'Success Message', detail: message });
    // setTimeout(() => {
    //   this.messageService.add({
    //     severity: 'success',
    //     summary: 'Success Message',
    //     detail: 'Order submitted'
    //   });
    // }, 1000);
  }

  ngAfterViewInit(): void {
    document.body.classList.remove('authentication-bg');
    document.body.classList.remove('authentication-bg-pattern');
  }

  /**
   * on settings button clicked from topbar
   */
  onSettingsButtonClicked(): void {
    document.body.classList.toggle('right-bar-enabled');
  }

  /**
   * On mobile toggle button clicked
   */
  onToggleMobileMenu(): void {
    this.showMobileMenu = !this.showMobileMenu;
  }
}
