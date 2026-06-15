import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';


@Component({
  selector: 'app-inputs',
  imports: [CommonModule,ReactiveFormsModule],
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

}

