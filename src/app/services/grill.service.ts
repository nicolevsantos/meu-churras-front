import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CriarGrillPayload,
  GrillPayload,
  ComprovantePayload,
} from '../model/grill.model';

@Injectable({
  providedIn: 'root',
})
export class GrillService {

  private readonly baseUrl = 'http://localhost:3000/grill';

  constructor(private http: HttpClient) {}

  /**
   * Cria um churrasco
   * POST /grill
   */
  criar(payload: CriarGrillPayload): Observable<ComprovantePayload> {
    return this.http.post<ComprovantePayload>(
      this.baseUrl,
      payload,
      {
        withCredentials: true,
      }
    );
  }

  /**
   * Lista todos os churrascos
   * GET /grill
   */
  listarTodos(): Observable<GrillPayload[]> {
    return this.http.get<GrillPayload[]>(
      this.baseUrl,
      {
        withCredentials: true,
      }
    );
  }

  /**
   * Busca churrasco por uuid
   * GET /grill/{uuid}
   */
  buscarPorUuid(uuid: string): Observable<GrillPayload> {
    return this.http.get<GrillPayload>(
      `${this.baseUrl}/${uuid}`,
      {
        withCredentials: true,
      }
    );
  }

  /**
   * Atualiza um churrasco
   * PUT /grill/{uuid}
   */
  editar(
    uuid: string,
    payload: CriarGrillPayload
  ): Observable<ComprovantePayload> {
    return this.http.put<ComprovantePayload>(
      `${this.baseUrl}/${uuid}`,
      payload,
      {
        withCredentials: true,
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
        withCredentials: true,
      }
    );
  }
}
