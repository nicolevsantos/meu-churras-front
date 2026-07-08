import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [

  {
    path: '',
    component: LayoutComponent,  // layout com o header fixo
    canActivate: [authGuard],
    children: [
      {
        path: 'listar-churrasco',
        loadComponent: () => import('./listar-churrasco/listar-churrasco.component')
          .then(m => m.ListarChurrascoComponent)
      },

      {
        path: 'churrasco',        // criação
        loadComponent: () => import('./churrasco/churrasco.component')
          .then(m => m.ChurrascoComponent)
      },
      {
        path: 'churrasco/:id',    // edição
        loadComponent: () => import('./churrasco/churrasco.component')
          .then(m => m.ChurrascoComponent)
      },

      {
        path: 'comprovante/:id',
        loadComponent: () => import('./comprovante/comprovante.component')
          .then(m => m.ComprovanteComponent)
      },


      {
        path: '',
        redirectTo: 'listar-churrasco',
        pathMatch: 'full'
      }

    ]
  },
  {
    path: 'externo',
    children: [
      {
        path: 'login',
        loadComponent: () => import('./login/login.component')
          .then(m => m.LoginComponent)
      },
      {
        path: 'cadastro',
        loadComponent: () => import('./cadastro/cadastro.component')
          .then(m => m.CadastroComponent)
      },
    ]
  }

];
