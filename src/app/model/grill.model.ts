export interface CriarGrillPayload {
  name: string;
  date: string;
  time: string;
  city: string;

  adults: number;
  kids: number;

  isVegan: boolean;
  veganCount: number;

  meats: string[];
  sides: string[];
  vegetables: string[];
  drinks: string[];
  extras: string[];
}

export interface GrillItemPayload {
  uuid: string;
  meat: string | null;
  side: string | null;
  vegetable: string | null;
  drink: string | null;
  extra: string | null;
  quantity: number | null;
  weight: number | null;
  grillUuid: string;
}

export interface GrillPayload {
  uuid: string;

  name: string;
  date: string;
  time: string;
  city: string;

  adults: number;
  kids: number;

  isVegan: boolean;
  veganCount: number;

  userUuid: string;

  items: GrillItemPayload[];
}

export interface ClimatePayload {
  uuid: string;
  climate: string;
  temperature: number;
  city: string;
}

export interface ResumoPayload {
  totalCarneKg: number;
  totalBebidaLitros: number;
  totalAcompanhamentos: number;
}

export interface ComprovantePayload {
  uuid: string;
  grillUuid: string;
  climateUuid: string;
  createdAt: string;
  comprovante: {
    uuid: string;
  };

  grill: GrillPayload;
  climate: ClimatePayload;

  dicas: string[];
  resumo: ResumoPayload;
}
