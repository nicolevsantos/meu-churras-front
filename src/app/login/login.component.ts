import { Component, inject } from '@angular/core';
import { InputsComponent } from '../shared/inputs/inputs.component';
import { ButtonComponent } from '../shared/button/button.component';


@Component({
  selector: 'app-login',
  imports: [InputsComponent, ButtonComponent],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {



}
