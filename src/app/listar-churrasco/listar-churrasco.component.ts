import { GrillService } from './../services/grill.service';
import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { ButtonComponent } from '../shared/button/button.component';
import { Router } from '@angular/router'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-churrasco',
  imports: [CommonModule, ButtonComponent, DatePipe],
  standalone: true,
  templateUrl: './listar-churrasco.component.html',
  styleUrl: './listar-churrasco.component.scss',
})
export class ListarChurrascoComponent {
  private router = inject(Router)
  grillService = inject(GrillService);

  idChurrasco: any
  nomeUsuario = 'Nicole';
  listaChurrascos: any[] = [];
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {

    this.carregarChurrascos();
  }

  carregarChurrascos() {
    this.grillService.listarTodos().subscribe((churrascos) => {
      this.listaChurrascos = [...churrascos];
      this.cdr.detectChanges();
    });
  }

removerChurrasco(uuid: string): void {
  Swal.fire({
    title: 'Excluir churrasco?',
    text: 'Esta ação não poderá ser desfeita.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Excluir',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#9b1c0c',
  }).then((result) => {
    if (!result.isConfirmed) return;

    this.grillService.deletar(uuid).subscribe({
      next: () => {
        this.listaChurrascos = this.listaChurrascos.filter(
          churrasco => churrasco.uuid !== uuid
        );

        Swal.fire({
          title: 'Excluído!',
          text: 'O churrasco foi removido com sucesso.',
          icon: 'success',
          confirmButtonColor: '#9b1c0c',
        });
      },
      error: (err) => {
        console.error(err);

        Swal.fire({
          title: 'Erro!',
          text: 'Não foi possível excluir o churrasco.',
          icon: 'error',
        });
      }
    });
  });
}

  verComprovante(uuid: string) {
    this.router.navigate(['/comprovante', uuid]);
  }

  editarChurrasco(uuid: string) {
    this.router.navigate(['/churrasco', uuid]);
  }

  criarChurrasco() {
    this.router.navigate(['/churrasco']);

  }

  formatarDataIgnorandoFuso(dataIso: string | undefined): string {
    if (!dataIso) return '';


    const apenasData = dataIso.split('T')[0];


    const [ano, mes, dia] = apenasData.split('-');


    return `${dia}/${mes}/${ano}`;
  }
}
