import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private loginService: LoginService, private router: Router) {}
  ngOnInit() {}

  ad_soyad = new FormControl('');
  sifre = new FormControl('');

  veriler() {
    this.loginService
      .loginVeri(this.ad_soyad.value, this.sifre.value)
      .subscribe((data) => {
        console.log(data);
        console.log('dayfa yonlendırme olacak');
        this.router.navigateByUrl('/main');
      });
  }
}
