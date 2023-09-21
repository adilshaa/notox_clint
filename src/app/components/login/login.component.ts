import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/core/services/service.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  constructor(
    private _formBuilder: FormBuilder,
    private _services: ServiceService,
    private _router: Router
  ) {}
  ngOnInit(): void {
    this.activatingForms();
  }
  activatingForms() {
    this.form = this._formBuilder.group({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [
        Validators.minLength(4),
        Validators.required,
      ]),
    });
  }

  loginUser() {
    let userData = this.form.getRawValue();
    if (userData) {
      this._services.loginUser(userData).subscribe(
        (res: any) => {
          if (res) {
            this._router.navigate(['/']);
            localStorage.setItem('token', res.token);
            localStorage.setItem('loginstatus', 'true');
          }
        },
        (err) => {
          if (err) {
            console.log(err);
            this._router.navigate(['/signin']);
          }
        }
      );
    }
  }
}
