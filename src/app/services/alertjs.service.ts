import { Injectable } from '@angular/core';
declare var alertify: any;

@Injectable({
  providedIn: 'root',
})
export class AlertjsService {
  constructor() {}

  kayitOldu(message: string) {
    alertify.success(message);
  }
}
