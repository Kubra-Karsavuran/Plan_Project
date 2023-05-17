import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { main_shema } from '../main/main_shema';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  constructor(private http: HttpClient) {}

  // TODO plan kaydı yapılacak burda
  makesaveplan(plankaydi: any): Observable<main_shema[]> {
    return this.http.post<main_shema[]>('/api/main', plankaydi);
  }

  // TODO verileri yansıtma kısmı
  verileriYansit(): Observable<main_shema[]> {
    return this.http.get<main_shema[]>('/api/veriler');
  }
}
