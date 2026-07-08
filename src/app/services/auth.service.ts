import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LoginRequest {
  email: string;
  senha: string;
}

export interface RegisterRequest {
  name: string;
  password: string;
  email: string;
}

export interface AuthResponse {
  token?: string;

  usuario: {
    id: number;
    nome: string;
    email: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly http = inject(HttpClient);

  private readonly api = 'http://192.168.0.20:3000/auth';


  login(payload: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.api}/login`,
      payload,
      {
        withCredentials: true
      }
    );
  }


  cadastrar(dados: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.api}/create`,
      dados,
      {
        withCredentials: true
      }
    );
  }
}
