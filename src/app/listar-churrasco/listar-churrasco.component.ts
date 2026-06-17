import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-listar-churrasco',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './listar-churrasco.component.html',
  styleUrl: './listar-churrasco.component.scss',
})
export class ListarChurrascoComponent {

  nomeUsuario = 'Nicole';

  listaChurrascos = [
    { nome: 'Churrasco do João', data: '2024/07/15', qtd_pessoas: 5 },
    { nome: 'Churrasco da Maria', data: '2024/08/20', qtd_pessoas: 10 },
    { nome: 'Churrasco do Pedro', data: '2024/09/10', qtd_pessoas: 8 }
  ]
}
