import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { InputsComponent } from '../shared/inputs/inputs.component';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonComponent } from '../shared/button/button.component';
import { GrillService } from '../services/grill.service';
import { CriarGrillPayload } from '../model/grill.model';
import Swal from 'sweetalert2';
import { ComprovanteService } from '../services/comprovante.service';

interface ChecklistItem {
  key: string;
  label: string;
}

@Component({
  selector: 'app-churrasco',
  standalone: true,
  imports: [InputsComponent, CommonModule, ReactiveFormsModule, ButtonComponent],
  templateUrl: './churrasco.component.html',
  styleUrl: './churrasco.component.scss',
})
export class ChurrascoComponent implements OnInit, OnDestroy {

  idChurrasco?: string;
  modoEdicao = false;
  private router = inject(Router);
  private grillService = inject(GrillService);

  private route = inject(ActivatedRoute);

  readonly carnesOptions: ChecklistItem[] = [
    { key: 'BOVINA', label: 'Carne bovina' },
    { key: 'SUINA', label: 'Carne suína' },
    { key: 'FRANGO', label: 'Frango' },
    { key: 'LINGUICA', label: 'Linguiça' },
  ];

  readonly acompanhamentosOptions: ChecklistItem[] = [
    { key: 'PAO_DE_ALHO', label: 'Pão de alho' },
    { key: 'VINAGRETE', label: 'Vinagrete' },
    { key: 'QUEIJO_COALHO', label: 'Queijo coalho' },
    { key: 'FAROFA', label: 'Farofa' },
  ];

  readonly vegetaisOptions: ChecklistItem[] = [
    { key: 'PIMENTOES', label: 'Pimentões' },
    { key: 'BATATA', label: 'Batata' },
    { key: 'MILHO', label: 'Milho' },
    { key: 'ABOBRINHA', label: 'Abobrinha' },
  ];

  readonly bebidasOptions: ChecklistItem[] = [
    { key: 'CERVEJA', label: 'Cerveja' },
    { key: 'REFRIGERANTE', label: 'Refrigerante' },
    { key: 'AGUA', label: 'Água' },
    { key: 'SUCO', label: 'Suco' },
    { key: 'ENERGETICO', label: 'Energético' },
  ];

  readonly extrasOptions: ChecklistItem[] = [
    { key: 'CARVAO', label: 'Carvão' },
    { key: 'GELO', label: 'Gelo' },
    { key: 'SAL_GROSSO', label: 'Sal grosso' },
  ];

  form: FormGroup;
  private subscriptions = new Subscription();

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      city: ['', Validators.required],

      adults: [0, Validators.required],
      kids: [0, Validators.required],

      isVegan: [false],

      meats: this.fb.group(this.buildBooleanGroup(this.carnesOptions)),
      sides: this.fb.group(this.buildBooleanGroup(this.acompanhamentosOptions)),
      vegetables: this.fb.group(this.buildBooleanGroup(this.vegetaisOptions)),
      drinks: this.fb.group(this.buildBooleanGroup(this.bebidasOptions)),
      extras: this.fb.group(this.buildBooleanGroup(this.extrasOptions)),
    });
  }

  ngOnInit(): void {

    this.idChurrasco = this.route.snapshot.paramMap.get('id') ?? undefined;

    this.modoEdicao = !!this.idChurrasco;

    if (this.modoEdicao && this.idChurrasco) {
      console.log('Editando churrasco:', this.idChurrasco);

      this.grillService.buscarPorUuid(this.idChurrasco).subscribe({
        next: (grill) => { // 'grill' já é o objeto direto vindo do back-end
          console.log('dados do churrasco:', grill);


          this.form.patchValue({
            name: grill.name,
            date: grill.date ? grill.date.substring(0, 10) : '',
            time: grill.time,
            city: grill.city,
            adults: grill.adults,
            kids: grill.kids,
            isVegan: grill.isVegan,
          });

          const checklists = this.mapearItemsParaChecklist(grill.items);

          this.form.get('meats')?.patchValue(checklists.meats);
          this.form.get('sides')?.patchValue(checklists.sides);
          this.form.get('vegetables')?.patchValue(checklists.vegetables);
          this.form.get('drinks')?.patchValue(checklists.drinks);
          this.form.get('extras')?.patchValue(checklists.extras);
        },
        error: (erro) => {
          console.error('Erro ao buscar detalhes do churrasco:', erro);
        }
      });
    }
  }

  private mapearItemsParaChecklist(items: any[]) {

    const resultado = {
      meats: {} as any,
      sides: {} as any,
      vegetables: {} as any,
      drinks: {} as any,
      extras: {} as any
    };


    this.carnesOptions.forEach(item => {
      resultado.meats[item.key] = false;
    });

    this.acompanhamentosOptions.forEach(item => {
      resultado.sides[item.key] = false;
    });

    this.vegetaisOptions.forEach(item => {
      resultado.vegetables[item.key] = false;
    });

    this.bebidasOptions.forEach(item => {
      resultado.drinks[item.key] = false;
    });

    this.extrasOptions.forEach(item => {
      resultado.extras[item.key] = false;
    });


    items?.forEach(item => {

      if (item.meat) {
        resultado.meats[item.meat] = true;
      }

      if (item.side) {
        resultado.sides[item.side] = true;
      }

      if (item.vegetable) {
        resultado.vegetables[item.vegetable] = true;
      }

      if (item.drink) {
        resultado.drinks[item.drink] = true;
      }

      if (item.extra) {
        resultado.extras[item.extra] = true;
      }

    });


    return resultado;
  }



  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  get isVegan(): boolean {
    return !!this.form.get('isVegan')?.value;
  }

  private buildBooleanGroup(
    options: ChecklistItem[]
  ): Record<string, boolean[]> {
    return options.reduce(
      (acc, option) => {
        acc[option.key] = [false];
        return acc;
      },
      {} as Record<string, boolean[]>
    );
  }

  getControl(path: string | (string | number)[]): FormControl {
    return this.form.get(path) as FormControl;
  }

  criarOuEditarChurrasco(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload: CriarGrillPayload = {
      ...this.form.value,
      meats: this.getSelectedItems('meats'),
      sides: this.getSelectedItems('sides'),
      vegetables: this.getSelectedItems('vegetables'),
      drinks: this.getSelectedItems('drinks'),
      extras: this.getSelectedItems('extras'),
    };

    if (this.idChurrasco) {
      console.log('EDITANDO');

      this.grillService.editar(this.idChurrasco, payload).subscribe({
        next: (resposta) => {
          Swal.fire({
            title: 'Churrasco atualizado!',
            text: 'Seu churrasco foi atualizado com sucesso.',
            icon: 'success',
            confirmButtonText: 'Ver comprovante',
            confirmButtonColor: '#9b1c0c',
          }).then(() => {
            this.router.navigate(['/comprovante', resposta.comprovante.uuid]);
          });
        },
        error: (err) => {
          console.error(err);

          Swal.fire({
            title: 'Erro!',
            text: 'Não foi possível atualizar o churrasco.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        },
      });

    } else {
      console.log('CRIANDO');

      this.grillService.criar(payload).subscribe({
        next: (resposta) => {
          Swal.fire({
            title: 'Churrasco criado!',
            text: 'Seu churrasco foi criado com sucesso.',
            icon: 'success',
            confirmButtonText: 'Ver comprovante',
            confirmButtonColor: '#9b1c0c',
          }).then(() => {
            this.router.navigate(['/comprovante', resposta.comprovante.uuid]);
          });
        },
        error: (err) => {
          console.error(err);

          Swal.fire({
            title: 'Erro!',
            text: 'Não foi possível criar o churrasco.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        },
      });
    }
  }

  private getSelectedItems(groupName: string): string[] {
    const values = this.form.get(groupName)?.value;

    return Object.keys(values).filter((key) => values[key]);
  }

  voltar(): void {
    this.router.navigate(['/']);
  }
}
