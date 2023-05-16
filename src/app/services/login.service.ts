import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { login_shema } from '../login/login_shema';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  loginVeri(ad_soyad: any, sifre: any): Observable<login_shema[]> {
    return this.http.get<login_shema[]>('/api/login/' + ad_soyad + '/' + sifre);
  }
}
