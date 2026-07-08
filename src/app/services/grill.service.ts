import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Comprovante,
  CriarGrillPayload,
  Grill
} from '../model/grill.model';

@Injectable({
  providedIn: 'root',
})
export class GrillService {

  private readonly baseUrl = 'http://192.168.0.20:3000/grill';

  constructor(private http: HttpClient) {}


  /**
   * Cria um churrasco
   * POST /grill
   */
  criar(payload: CriarGrillPayload): Observable<Comprovante> {
    return this.http.post<Comprovante>(
      this.baseUrl,
      payload,
      {
        withCredentials: true
      }
    );
  }


  /**
   * Lista todos os churrascos
   * GET /grill
   */
  listarTodos(): Observable<Grill[]> {
    return this.http.get<Grill[]>(
      this.baseUrl,
      {
        withCredentials: true
      }
    );
  }


  /**
   * Busca churrasco por uuid
   * GET /grill/{uuid}
   */
  buscarPorUuid(uuid: string): Observable<Grill> {
    return this.http.get<Grill>(
      `${this.baseUrl}/${uuid}`,
      {
        withCredentials: true
      }
    );
  }


  /**
   * Deleta churrasco
   * DELETE /grill/{uuid}
   */
  deletar(uuid: string): Observable<void> {
    return this.http.delete<void>(
      `${this.baseUrl}/${uuid}`,
      {
        withCredentials: true
      }
    );
  }
}
