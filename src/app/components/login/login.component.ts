import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  roles: string[];
  errMsj!: string;

  constructor(private tokenService: TokenService, private authService: AuthService, private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group(
      {
        nombreUsuario: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(8)]],
      }
    )
  }

  ngOnInit() {
  }

  get nombreUsuario() {
    return this.form.get('nombreUsuario')
  }

  get password() {
    return this.form.get('password');
  }

  onLogin(): void {
    this.authService.login(this.form.value).subscribe(data => {
      this.tokenService.setToken(data.token);
      this.tokenService.setUserName(data.nombreUsuario);
      this.tokenService.setAuthorities(data.authorities);
      this.roles = data.authorities;
      this.router.navigate(['/portfolio']);
    }, err => {
      this.errMsj = err.error.mensaje;
    })
  }
}




