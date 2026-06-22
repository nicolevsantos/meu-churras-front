import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonComponent } from './shared/button/button.component';
import { InputsComponent } from './shared/inputs/inputs.component';
import { LayoutComponent } from './layout/layout.component';
import { ChurrascoComponent } from './churrasco/churrasco.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,ButtonComponent,InputsComponent,LayoutComponent,ChurrascoComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('meu-churras');

}
