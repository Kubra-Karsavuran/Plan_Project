import { Component } from '@angular/core';
import { MainService } from '../services/main.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { main_shema } from './main_shema';
import { AlertjsService } from '../services/alertjs.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent {
  constructor(
    private mainService: MainService,
    private router: Router,
    private fb: FormBuilder,
    private alertjs: AlertjsService
  ) {}

  planListesi: main_shema[] = [];
  planAyrinti: main_shema[] = [];
  guncel_veri: main_shema[] = [];
  //TODO ekrana yansıtılacaklar
  ngOnInit() {
    this.mainService.verileriYansit().subscribe((data) => {
      this.planListesi = data;
    });
  }

  //TODO modal ıslemlerı yapıldı
  main: boolean = true;
  yan: boolean = false;
  ayrintidiv: boolean = false;
  guncelle_div: boolean = false;
  planEkle() {
    this.main = false;
    this.yan = true;
  }
  geriDon() {
    this.main = true; // plan liste
    this.yan = false; // plan alma
    this.ayrintidiv = false; // plan ayırntıları
    this.guncelle_div = false;
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
    this.guncelle_div = false;
  }

  // TODO guncelleme form tanımı
  newform = new FormGroup({
    newtime: new FormControl('', [Validators.required]),
    newdescription: new FormControl('', [Validators.required]),
    newnot: new FormControl('', [Validators.required]),
  });

  guncel_veri_id: number = 0;
  // TODO plan guncelleme olacak burda
  gunveriget(veriler: main_shema): void {
    this.main = false; // plan liste
    this.yan = false; // plan alma
    this.ayrintidiv = false; // plan ayırntıları
    this.guncelle_div = true; // guncelleme dıvı
    // guncellemeler için yapılan işlemdir
    this.guncel_veri_id = veriler._id;

    this.newform = this.fb.group({
      newtime: [veriler.plantime],
      newdescription: [veriler.plandescription],
      newnot: [veriler.plannot],
    });
  }

  // TODO plan guncelleme işlemi yapılacak burda
  update() {
    console.log('gelen guncel verı burda');
    console.log(this.newform.value);
    console.log('guncellenecek verı id si');
    console.log(this.guncel_veri_id);
    this.mainService
      .newupdate(this.newform.value, this.guncel_veri_id)
      .subscribe((data) => {
        this.alertjs.kayitOldu('bakalim gelecekmi');
        setInterval(function () {
          window.location.reload();
        }, 2000);
      });
  }
}
