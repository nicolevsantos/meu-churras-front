import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {

private authService = inject(AuthService);
private router = inject(Router);


  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/externo/login']);
      },
      error: (err) => {
        console.error('Erro ao fazer logout', err);
        this.router.navigate(['/externo/login']);
      }
    });
  }

}
