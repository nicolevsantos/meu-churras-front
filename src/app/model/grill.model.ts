export interface CriarGrillPayload {
  name: string;
  date: string;
  time: string;
  city: string;

  adults: number;
  kids: number;

  isVegan: boolean;
  veganCount: number;

  alcoholDrinkers: number;

  meats: string[];
  sides: string[];
  vegetables: string[];
  drinks: string[];
  extras: string[];
}


export interface Grill {
  uuid: string;

  name: string;
  date: string;
  time: string;
  city: string;

  adults: number;
  kids: number;

  isVegan: boolean;
  veganCount: number;

  alcoholDrinkers: number;

  meats: string[];
  sideDishes: string[];
  vegetables: string[];
  drinks: string[];
  extras: string[];

  createdAt?: string;
}


/**
 * Retorno do POST /grill
 * O backend gera o comprovante automaticamente.
 */
export interface Comprovante {
  uuid: string;
  grill: Grill;
  createdAt: string;
}
