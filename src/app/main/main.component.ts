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
    makeit: new FormControl(0),
  });

  plansave() {
    console.log('gelen verı burda bakalım dogrumu geldı');
    console.log(this.plankaydi.value);
    this.mainService.makesaveplan(this.plankaydi.value).subscribe();
    location.reload();
  }

  renk: string = 'white';
  id_get: number = 0;
  //TODO verileri yaptınmı yapmadınmı
  yesOrno(veri_id: any) {
    this.mainService.planTakibi().subscribe((data) => {
      this.id_get = veri_id;
      if (data.result == 1) {
        this.renk = 'green';
      }
    });
  }
}
