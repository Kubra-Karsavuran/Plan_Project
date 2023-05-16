import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private loginService: LoginService) {}
  ngOnInit() {}

  ad_soyad = new FormControl('');
  sifre = new FormControl('');

  loginControl() {
    console.log('gelen verıler burda: ');
    console.log(this.ad_soyad);
    console.log(this.sifre);
    // this.loginService
    //   .loginVeri(this.ad_soyad, this.sifre)
    //   .subscribe((data) => {});
  }
}
