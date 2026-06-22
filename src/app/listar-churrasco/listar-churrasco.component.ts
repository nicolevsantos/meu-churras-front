import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../shared/button/button.component';
import { Router } from '@angular/router'

@Component({
  selector: 'app-listar-churrasco',
  imports: [CommonModule, ButtonComponent],
  standalone: true,
  templateUrl: './listar-churrasco.component.html',
  styleUrl: './listar-churrasco.component.scss',
})
export class ListarChurrascoComponent {
  private router = inject(Router)

  nomeUsuario = 'Nicole';
  listaChurrascos: any[] = [];

  ngOnInit(): void {
    this.carregarChurrascos();
  }

  carregarChurrascos() {
    this.listaChurrascos = [
      { nome: 'Churrasco do João', data: '2024/07/15', qtd_pessoas: 5, id: 1 },
      { nome: 'Churrasco da Maria', data: '2024/08/20', qtd_pessoas: 10, id: 2 },
      { nome: 'Churrasco do Pedro', data: '2024/09/10', qtd_pessoas: 8, id: 3 }

    ]

  }

  removerChurrasco(id: number) {
    this.listaChurrascos = this.listaChurrascos.filter(churrasco => churrasco.id !== id);
  }

  verComprovante(id: number) {
    this.router.navigate(['/comprovante', id]);
  }

   editarChurrasco(id: number) {
    this.router.navigate(['/churrasco', id]);
  }

  criarChurrasco(){
    this.router.navigate(['/churrasco']);

  }
}
