import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

export interface ItemChurrasco {
  nome: string;
  quantidade: number;
  unidade: string;
}

export interface ChurrascoDetalhe {
  id: number;
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

@Component({
  selector: 'app-comprovante',
  imports: [CommonModule,RouterModule],
  standalone: true,
  templateUrl: './comprovante.component.html',
  styleUrl: './comprovante.component.scss',
})

export class ComprovanteComponent {


 private router = inject(Router);

  churrascoDetalhe: ChurrascoDetalhe = {
    id: 1,
    nome: 'Meu Churrasco',
    pessoas: 10,
    duracao: '6 horas',
    data: '11/06/2026',
    previsaoTempo: 'Chance de chuva 60%',
    temperatura: '28°C',
    dicas: [
      'Chance de chuva altas: Prepare um espaço coberto',
      'Mantenha o carvão protegido e tenha uma lona a mão'
    ],
    itens: {
      carnes: [
        { nome: 'Carne bovina', quantidade: 2.00, unidade: 'kg' },
        { nome: 'Frango', quantidade: 1.20, unidade: 'kg' },
        { nome: 'Linguiça', quantidade: 1.20, unidade: 'kg' },
      ],
      acompanhamentos: [
        { nome: 'Pão de alho', quantidade: 12, unidade: 'un' },
        { nome: 'Tomates', quantidade: 5, unidade: 'un' },
        { nome: 'Cebola', quantidade: 2, unidade: 'un' },
      ],
      bebidas: [
        { nome: 'Cerveja', quantidade: 12, unidade: 'litros' },
        { nome: 'Refrigerante', quantidade: 3, unidade: 'litros' },
      ],
      extras: [
        { nome: 'Carvão', quantidade: 2, unidade: 'sacos' },
        { nome: 'Gelo', quantidade: 1.5, unidade: 'sacos' },
      ],
    }
  };

  get totalBebidas(): number {
    return this.churrascoDetalhe.itens.bebidas
      .reduce((soma, item) => soma + item.quantidade, 0);
  }

  get totalAcompanhamentos(): number {
    return this.churrascoDetalhe.itens.acompanhamentos.length;
  }

  get totalCarne(): string {
    const total = this.churrascoDetalhe.itens.carnes
      .reduce((soma, item) => soma + item.quantidade, 0);

    return total.toFixed(2).replace('.', ',');
  }

   voltar(): void {
    this.router.navigate(['/']);
  }

}
