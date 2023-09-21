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
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  form!: FormGroup;
  constructor(
    private _formBuilder: FormBuilder,
    private _services: ServiceService,
    private _router: Router
  ) {}
  ngOnInit(): void {
    this.form = this._formBuilder.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [
        Validators.minLength(4),
        Validators.required,
      ]),
    });
  }

  signInUser() {
    let userData = this.form.getRawValue();
    console.log(userData);

    if (userData) {
      this._services.signInUser(userData).subscribe(
        (res) => {
          if (res) {
            this._router.navigate(['/']);
          }
        },
        (err) => {
          console.log(err);
          if (err.error.key == 'signin') 
          {
            console.log('entred');
            
            this._router.navigate(['/signin']);
          } else {
            this._router.navigate(['/signup']);
          }
            
        }
      );
    }
  }
}
