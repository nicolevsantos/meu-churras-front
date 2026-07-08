import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { ComprovanteApi, ComprovanteService, Drinks, Extras, Meat, Sides, Vegetables } from '../services/comprovante.service';


export interface ItemChurrasco {
  nome: string;
  quantidade: number;
  unidade: string;
}

export interface ChurrascoDetalhe {
  uuid: string;
  nome: string;
  pessoas: number;
  duracao: string;
  data: string;
  previsaoTempo: string;
  temperatura: string;
  dicas: string[];
  itens: {
    carnes: ItemChurrasco[];
    acompanhamentos: ItemChurrasco[];
    bebidas: ItemChurrasco[];
    extras: ItemChurrasco[];
  };
}

const MEAT_LABELS: Record<Meat, string> = {
  FRANGO: 'Frango',
  SUINA: 'Carne suína',
  BOVINA: 'Carne bovina',
  LINGUICA: 'Linguiça',
};

const SIDES_LABELS: Record<Sides, string> = {
  PAO_DE_ALHO: 'Pão de alho',
  VINAGRETE: 'Vinagrete',
  QUEIJO_COALHO: 'Queijo coalho',
  FAROFA: 'Farofa',
};

const VEGETABLES_LABELS: Record<Vegetables, string> = {
  PIMENTOES: 'Pimentões',
  BATATA: 'Batata',
  MILHO: 'Milho',
  ABOBRINHA: 'Abobrinha',
};

const DRINKS_LABELS: Record<Drinks, string> = {
  CERVEJA: 'Cerveja',
  REFRIGERANTE: 'Refrigerante',
  AGUA: 'Água',
  SUCO: 'Suco',
  ENERGETICO: 'Energético',
};

const EXTRAS_LABELS: Record<Extras, string> = {
  CARVAO: 'Carvão',
  GELO: 'Gelo',
  SAL_GROSSO: 'Sal grosso',
};

@Component({
  selector: 'app-comprovante',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './comprovante.component.html',
  styleUrl: './comprovante.component.scss',
})
export class ComprovanteComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private comprovanteService = inject(ComprovanteService);

  churrascoDetalhe = signal<ChurrascoDetalhe | null>(null);
  resumo = signal({ totalCarneKg: 0, totalBebidaLitros: 0, totalAcompanhamentos: 0 });
  carregando = signal(true);
  erro = signal(false);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.router.navigate(['/listar-churrasco']);
      return;
    }

    this.comprovanteService.buscarPorUuid(id).subscribe({
      next: (dados: ComprovanteApi) => {
        this.churrascoDetalhe.set(this.mapearParaDetalhe(dados));
        this.resumo.set(dados.resumo);
        this.carregando.set(false);
      },
      error: (err) => {
        console.error('Erro ao buscar comprovante', err);
        this.erro.set(true);
        this.carregando.set(false);
        this.router.navigate(['/listar-churrasco']);
      },
    });
  }

  private mapearParaDetalhe(dados: ComprovanteApi): ChurrascoDetalhe {
    const items = dados.grill.items;

    const carnes = items
      .filter((i): i is typeof i & { meat: Meat } => !!i.meat)
      .map((i) => ({
        nome: MEAT_LABELS[i.meat],
        quantidade: i.weight ?? 0,
        unidade: 'kg',
      }));

    const acompanhamentos = [
      ...items
        .filter((i): i is typeof i & { side: Sides } => !!i.side)
        .map((i) => ({
          nome: SIDES_LABELS[i.side],
          quantidade: i.quantity ?? 0,
          unidade: 'un',
        })),
      ...items
        .filter((i): i is typeof i & { vegetable: Vegetables } => !!i.vegetable)
        .map((i) => ({
          nome: VEGETABLES_LABELS[i.vegetable],
          quantidade: i.quantity ?? 0,
          unidade: 'un',
        })),
    ];

    const bebidas = items
      .filter((i): i is typeof i & { drink: Drinks } => !!i.drink)
      .map((i) => ({
        nome: DRINKS_LABELS[i.drink],
        quantidade: i.quantity ?? 0,
        unidade: 'L',
      }));

    const extras = items
      .filter((i): i is typeof i & { extra: Extras } => !!i.extra)
      .map((i) => ({
        nome: EXTRAS_LABELS[i.extra],
        quantidade: i.quantity ?? i.weight ?? 0,
        unidade: i.weight != null ? 'kg' : 'un',
      }));

    return {
      uuid: dados.uuid,
      nome: dados.grill.name,
      pessoas: dados.grill.adults + dados.grill.kids,
      duracao: dados.grill.time,
      data: this.formatarData(dados.grill.date),
      previsaoTempo: dados.climate.climate,
      temperatura: `${dados.climate.temperature}°C`,
      dicas: dados.dicas,
      itens: { carnes, acompanhamentos, bebidas, extras },
    };
  }

  private formatarData(dataIso: string): string {
    return new Date(dataIso).toLocaleDateString('pt-BR');
  }

  voltar(): void {
    this.router.navigate(['/listar-churrasco']);
  }
}
