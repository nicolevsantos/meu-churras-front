import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { ButtonComponent } from '../shared/button/button.component';
import { InputsComponent } from '../shared/inputs/inputs.component';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

function passwordsMatchValidator(
  passwordControlName: string,
  confirmControlName: string
) {
  return (group: AbstractControl): ValidationErrors | null => {
    const password = group.get(passwordControlName);
    const confirmPassword = group.get(confirmControlName);

    if (!password || !confirmPassword) return null;

    if (confirmPassword.value !== password.value) {
      confirmPassword.setErrors({ ...confirmPassword.errors, mismatch: true });
    } else if (confirmPassword.errors) {
      const { mismatch, ...rest } = confirmPassword.errors;
      confirmPassword.setErrors(Object.keys(rest).length ? rest : null);
    }

    return null;
  };
}

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [InputsComponent, ButtonComponent, ReactiveFormsModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss',
})
export class CadastroComponent {
  form: FormGroup;

  private router = inject(Router);
  private authService = inject(AuthService);

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: passwordsMatchValidator('password', 'confirmPassword'),
      }
    );

    this.form.get('password')?.valueChanges.subscribe(() => {
      this.form.get('confirmPassword')?.updateValueAndValidity();
    });
  }

  getControl(path: string | (string | number)[]): FormControl {
    return this.form.get(path) as FormControl;
  }

  cadastrar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();

      Swal.fire({
        icon: 'warning',
        title: 'Campos inválidos',
        text: 'Preencha todos os campos corretamente.',
        confirmButtonColor: '#9b1c0c',
      });

      return;
    }

    const { name, email, password } = this.form.value;

    this.authService.cadastrar({
      name,
      email,
      password,
    }).subscribe({
      next: (res) => {
        console.log('User created successfully!', res);

        if (res.token) {
          localStorage.setItem('token', res.token);
        }

        Swal.fire({
          icon: 'success',
          title: 'Cadastro realizado!',
          text: 'Sua conta foi criada com sucesso.',
          confirmButtonColor: '#9b1c0c',
        }).then(() => {
          this.router.navigate(['externo/login']);
        });
      },
      error: (err) => {
        console.error('Registration error:', err);

        Swal.fire({
          icon: 'error',
          title: 'Erro ao cadastrar',
          text: 'Não foi possível criar a conta. Verifique os dados e tente novamente.',
          confirmButtonColor: '#9b1c0c',
        });
      },
    });
  }
}
