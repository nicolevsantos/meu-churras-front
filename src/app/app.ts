import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonComponent } from './shared/button/button.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,ButtonComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('meu-churras');

  teste(){
    console.log('teste');
  }
}
