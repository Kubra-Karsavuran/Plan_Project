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

  // TODO plan takıbı yapılıyor burda
  planTakibi(veri_id: any): Observable<{ result: string }> {
    return this.http.get<{ result: string }>('/api/planTakibi/' + veri_id);
  }

  // TODO plan takıbı 1 -> 0 cevırme ıslemı yapılacak
  planTakibiiki(veri_id: any): Observable<{ result: string }> {
    return this.http.get<{ result: string }>('/api/planTakibiiki/' + veri_id);
  }

  // TODO tabloyu temızle ıslemı
  tablotemizle(): Observable<{ result: string }> {
    return this.http.get<{ result: string }>('/api/tablotemizle/');
  }

  // TODO plan silme işlemi yapılacak
  planSil(veri_id: any): Observable<{ result: string }> {
    return this.http.get<{ result: string }>('/api/planSil/' + veri_id);
  }
}
