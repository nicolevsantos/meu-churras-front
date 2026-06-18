import { Component, inject } from '@angular/core';
import {ButtonComponent } from '../shared/button/button.component';
import { InputsComponent } from '../shared/inputs/inputs.component';


@Component({
  selector: 'app-cadastro',
  imports: [InputsComponent, ButtonComponent],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss',
})
export class CadastroComponent {



}
