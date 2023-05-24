import { Component } from '@angular/core';
import { MainService } from '../services/main.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { main_shema } from './main_shema';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent {
  constructor(private mainService: MainService, private router: Router) {}

  planListesi: main_shema[] = [];
  planAyrinti: main_shema[] = [];
  //TODO ekrana yansıtılacaklar
  ngOnInit() {
    this.mainService.verileriYansit().subscribe((data) => {
      this.planListesi = data;
    });
  }

  //TODO modal ıslemlerı yapıldı
  main: boolean = true;
  yan: boolean = false;
  planEkle() {
    this.main = false;
    this.yan = true;
  }
  geriDon() {
    this.main = true;
    this.yan = false;
  }

  // TODO plan kaydı yapılacak
  plankaydi = new FormGroup({
    plantime: new FormControl('', [Validators.required]),
    plandescription: new FormControl('', [Validators.required]),
    plannot: new FormControl('', [Validators.required]),
    makeit: new FormControl(0),
  });

  plansave() {
    console.log('gelen verı burda bakalım dogrumu geldı');
    console.log(this.plankaydi.value);
    this.mainService.makesaveplan(this.plankaydi.value).subscribe();
    location.reload();
  }

  //TODO verileri  0 -> 1 yapma işlemi
  yes(veri_id: any) {
    this.mainService.planTakibi(veri_id).subscribe((data) => {
      console.log('gelen veri:');
      console.log(data.result);
      location.reload();
    });
  }

  // TODO verileri 1 -> 0 yapma işlemi yapılacak
  no(veri_id: any) {
    this.mainService.planTakibiiki(veri_id).subscribe((data) => {
      console.log('gelen veri:');
      console.log(data.result);
      location.reload();
    });
  }

  // TODO tablo temızleme ıslemı,
  ClearTablo() {
    this.mainService.tablotemizle().subscribe((data) => {
      console.log('tablo temızlemdı');
      location.reload();
    });
  }

  // TODO plan silme işlemi
  planSil(veri_id: any) {
    this.mainService.planSil(veri_id).subscribe((data) => {
      location.reload();
    });
  }

  // TODO planin ayrıntılarını yansıtacak
  ayrintidiv: boolean = false;
  ayrinti(veri_id: any) {
    this.mainService.ayrinti(veri_id).subscribe((data) => {
      this.main = false;
      this.yan = false;
      this.ayrintidiv = true;
      this.planAyrinti = data;
    });
  }

  // TODO ayrıntı kapatma kısmı
  ayrintikapat() {
    this.main = true; // plan liste
    this.yan = false; // plan alma
    this.ayrintidiv = false; // plan ayırntıları
  }

  // TODO plan guncelleme olacak burda
  güncelleme(veri_id: any) {
    alert('guncelleme olacak');
  }
}
