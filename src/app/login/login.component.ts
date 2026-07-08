import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputsComponent } from '../shared/inputs/inputs.component';
import { ButtonComponent } from '../shared/button/button.component';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [InputsComponent, ButtonComponent, ReactiveFormsModule],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private router = inject(Router);
  private authService = inject(AuthService);
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  getControl(path: string | (string | number)[]): FormControl {
    return this.form.get(path) as FormControl;
  }

  cadastrar() {
    this.router.navigate(['externo/cadastro']);
  }

  private salvarDadosUsuario(token: string): void {
    const payload = JSON.parse(atob(token.split('.')[1]));

    const userId = payload.id ?? payload.sub;

    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
  }

  entrar(): void {
    this.authService.login(this.form.value).subscribe({
      next: (response) => {


        this.router.navigate(['/listar-churrasco']);



      },
      error: (erro) => {
        console.error('Erro ao fazer login', erro);
      }
    });
  }
}
