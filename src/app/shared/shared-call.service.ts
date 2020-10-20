import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedCallService {
  public notifyOpenDialerNotification = new Subject<any>();
  public notifyDialNumberFromDialerNotification = new Subject<any>();
  constructor() { }

  sendOpenDialerNotification(data: any): void {
    this.notifyOpenDialerNotification.next(data);
  }

  getOpenDialerNotification(): Observable<any> {
    return this.notifyOpenDialerNotification.asObservable();
  }

  sendDialNumberFromDialerNotification(data: any): void {
    this.notifyDialNumberFromDialerNotification.next(data);
  }

  getDialNumberFromDialerNotification(): Observable<any> {
    return this.notifyDialNumberFromDialerNotification.asObservable();
  }
}
