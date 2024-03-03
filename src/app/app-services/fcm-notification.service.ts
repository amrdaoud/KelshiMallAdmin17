import { Injectable } from '@angular/core';
import { MessagePayload, getMessaging, getToken, onMessage } from "firebase/messaging";
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
// import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class FcmNotificationService {
  private message = new BehaviorSubject<MessagePayload | null>(null);
  constructor() { }
  requestPermission(): Promise<string | void> {
    const messaging = getMessaging();
    return ( getToken(messaging, { vapidKey: environment.firebase.vapidKey}));
  }
  listen() {
    const messaging = getMessaging();
    onMessage(messaging, (payload: any) => {
      if(payload) {
        this.message.next(payload)
      }
    });
  }
  get message$(): Observable<MessagePayload | null> {
    return this.message.asObservable();
  }
}
