import { Injectable } from '@angular/core';
import { MainService } from './main.service';
declare var alertify: any;

@Injectable({
  providedIn: 'root',
})
export class AlertjsService {
  constructor(private mainService: MainService) {}

  // TODO kayıt ıslemı
  kayitOldu(message: string) {
    alertify.success(message);
  }

  // TODO silme işlemi
  plansilme(veri_id: string) {
    alertify.confirm(
      'Silinmesi İstediğine Emin misin ?',
      () => {
        this.mainService.planSil(veri_id).subscribe((data) => {
          alertify.success('Plan Silindi');
          setInterval(function () {
            window.location.reload();
          }, 2000);
        });
      },
      function () {
        alertify.error('Silme İşlemi Kapatıldı');
      }
    );
  }

  // TODO tablo temızleme işlemi
  tabloClear() {
    alertify.confirm(
      'Tablonun Temizlenmesini İstediğine Emin misiniz ?',
      () => {
        this.mainService.tablotemizle().subscribe((data) => {
          alertify.success('Tablo Temizlendi');
          setInterval(function () {
            window.location.reload();
          }, 2000);
        });
      },
      function () {
        alertify.error('Silme İşlemi Kapatıldı');
      }
    );
  }
}
