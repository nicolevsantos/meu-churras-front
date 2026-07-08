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
import { Router } from '@angular/router';
import { ButtonComponent } from '../shared/button/button.component';
import { GrillService } from '../services/grill.service';
import { CriarGrillPayload } from '../model/grill.model';

interface ChecklistItem {
  key: string;
  label: string;
}

@Component({
  selector: 'app-churrasco',
  standalone: true,
  imports: [InputsComponent, CommonModule, ReactiveFormsModule,ButtonComponent],
  templateUrl: './churrasco.component.html',
  styleUrl: './churrasco.component.scss',
})
export class ChurrascoComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  private grillService = inject(GrillService);

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
      veganCount: [{ value: 0, disabled: true }],

      alcoholDrinkers: [0, Validators.required],

      meats: this.fb.group(this.buildBooleanGroup(this.carnesOptions)),
      sides: this.fb.group(this.buildBooleanGroup(this.acompanhamentosOptions)),
      vegetables: this.fb.group(this.buildBooleanGroup(this.vegetaisOptions)),
      drinks: this.fb.group(this.buildBooleanGroup(this.bebidasOptions)),
      extras: this.fb.group(this.buildBooleanGroup(this.extrasOptions)),
    });
  }

  ngOnInit(): void {
    const hasVeganControl = this.form.get('isVegan')!;
    const veganCountControl = this.getControl('veganCount');

    this.subscriptions.add(
      hasVeganControl.valueChanges.subscribe((value: boolean) => {
        if (value) {
          veganCountControl.enable();
          veganCountControl.setValidators([
            Validators.required,
            Validators.min(1),
          ]);
        } else {
          veganCountControl.disable();
          veganCountControl.clearValidators();
          veganCountControl.setValue(0);
        }

        veganCountControl.updateValueAndValidity();
      })
    );
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

  criarChurrasco(): void {
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

  this.grillService.criar(payload).subscribe({
    next: (comprovante) => {
      console.log('Churrasco criado:', comprovante);
      this.router.navigate(['/comprovante', comprovante.uuid]);
    },
    error: (err) => {
      console.error('Erro ao criar churrasco:', err);
    }
  });
}

  private getSelectedItems(groupName: string): string[] {
    const values = this.form.get(groupName)?.value;

    return Object.keys(values).filter((key) => values[key]);
  }

  voltar(): void {
    this.router.navigate(['/']);
  }
}
