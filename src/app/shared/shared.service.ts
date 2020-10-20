import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public notifySuccessToastNotification = new Subject<any>();
  public notifyInfoSendToastNotification = new Subject<any>();
  public notifyWarningSendToastNotification = new Subject<any>();
  public notifyErrorSendToastNotification = new Subject<any>();
  constructor() { }

  sendSuccessToastNotification(data: any): void {
    this.notifySuccessToastNotification.next(data);
  }

  getSuccessToastNotification(): Observable<any> {
    return this.notifySuccessToastNotification.asObservable();
  }

  sendInfoToastNotification(data: any): void {
    this.notifyInfoSendToastNotification.next(data);
  }

  getInfoToastNotification(): Observable<any> {
    return this.notifyInfoSendToastNotification.asObservable();
  }

  sendWarningToastNotification(data: any): void {
    this.notifyWarningSendToastNotification.next(data);
  }

  getWarningToastNotification(): Observable<any> {
    return this.notifyWarningSendToastNotification.asObservable();
  }

  sendErrorToastNotification(data: any): void {
    this.notifyErrorSendToastNotification.next(data);
  }

  getErrorToastNotification(): Observable<any> {
    return this.notifyErrorSendToastNotification.asObservable();
  }



}
