import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

/**
 * Componente de estilização/padrão para inputs.
 * Não define NENHUMA regra de validação (Validators.required, etc).
 * Quem cria o FormControl (a tela) decide as validações; aqui a gente só:
 *  - recebe o control já pronto e vincula via [formControl]
 *  - lê o estado dele (invalid/touched) pra saber se mostra erro
 *  - traduz a *chave* do erro (ex: "required") num texto amigável,
 *    que a tela pode sobrescrever via [errorMessages]
 */
@Component({
  selector: 'app-inputs',
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './inputs.component.html',
  styleUrl: './inputs.component.scss',
})
export class InputsComponent {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() type = 'text';
  @Input() id = '';
  @Input() styles: 'default' | 'secondary' = 'default';
  @Input() control!: FormControl;
  @Input() required = false;

  /** Permite cada tela sobrescrever/adicionar mensagens por chave de erro */
  @Input() errorMessages: Record<string, string> = {};

  private readonly defaultErrorMessages: Record<string, string> = {
    required: 'Campo obrigatório',
    email: 'E-mail inválido',
    minlength: 'Tamanho mínimo não atingido',
    maxlength: 'Tamanho máximo excedido',
    pattern: 'Formato inválido',
    min: 'Valor abaixo do mínimo permitido',
    max: 'Valor acima do máximo permitido',
  };

  get showError(): boolean {
    return !!this.control && this.control.invalid && (this.control.touched || this.control.dirty);
  }

  get errorText(): string | null {
    if (!this.showError || !this.control?.errors) return null;

    const firstErrorKey = Object.keys(this.control.errors)[0];
    return this.errorMessages[firstErrorKey] ?? this.defaultErrorMessages[firstErrorKey] ?? 'Campo inválido';
  }
}
