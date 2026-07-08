import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

export type Meat = 'FRANGO' | 'SUINA' | 'BOVINA' | 'LINGUICA';
export type Sides = 'PAO_DE_ALHO' | 'VINAGRETE' | 'QUEIJO_COALHO' | 'FAROFA';
export type Vegetables = 'PIMENTOES' | 'BATATA' | 'MILHO' | 'ABOBRINHA';
export type Drinks = 'CERVEJA' | 'REFRIGERANTE' | 'AGUA' | 'SUCO' | 'ENERGETICO';
export type Extras = 'CARVAO' | 'GELO' | 'SAL_GROSSO';

export interface ItemApi {
  uuid: string;
  meat?: Meat | null;
  side?: Sides | null;
  vegetable?: Vegetables | null;
  drink?: Drinks | null;
  extra?: Extras | null;
  quantity?: number | null;
  weight?: number | null;
}

export interface ComprovanteApi {
  uuid: string;
  grillUuid: string;
  climateUuid: string;
  createdAt: string;
  grill: {
    uuid: string;
    name: string;
    date: string;
    time: string;
    adults: number;
    kids: number;
    isVegan: boolean;
    city: string;
    items: ItemApi[];
  };
  climate: {
    climate: string;
    temperature: number;
    city: string;
  };
  dicas: string[];
  resumo: {
    totalCarneKg: number;
    totalBebidaLitros: number;
    totalAcompanhamentos: number;
  };
}

@Injectable({ providedIn: 'root' })
export class ComprovanteService {
  private http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:3000/comprovante';

  /**
   * Busca comprovante (com grill, climate, dicas e resumo) por uuid
   * GET /comprovante/{uuid}
   */
  buscarPorUuid(uuid: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${uuid}`, {
      withCredentials: true,
    });
  }
}
