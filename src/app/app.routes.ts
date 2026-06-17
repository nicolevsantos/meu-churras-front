import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [

  {
    path: '',
    component: LayoutComponent,  // layout com o header fixo
    children: [
      {
        path: 'churrascos',
        loadComponent: () => import('./listar-churrasco/listar-churrasco.component')
          .then(m => m.ListarChurrascoComponent)
      },
      {
        path: '',
        redirectTo: 'churrascos',
        pathMatch: 'full'
      }

    ]
  }


  // públicas
  // {
  //   path: 'login',
  //   loadComponent: () =>
  //     import('./pages/login/login.component')
  //       .then(c => c.LoginComponent)
  // },

  // privadas
  // {
  //   path: '',
  //   loadComponent: () =>
  //     import('./layouts/internal-layout/internal-layout.component')
  //       .then(c => c.InternalLayoutComponent),

  //   children: [
  //     {
  //       path: 'dashboard',
  //       loadComponent: () =>
  //         import('./pages/dashboard/dashboard.component')
  //           .then(c => c.DashboardComponent)
  //     },
  //     {
  //       path: 'eventos',
  //       loadComponent: () =>
  //         import('./pages/eventos/eventos.component')
  //           .then(c => c.EventosComponent)
  //     },
  //     {
  //       path: 'convidados',
  //       loadComponent: () =>
  //         import('./pages/convidados/convidados.component')
  //           .then(c => c.ConvidadosComponent)
  //     },
  //     {
  //       path: '',
  //       redirectTo: 'dashboard',
  //       pathMatch: 'full'
  //     }
  //   ]
  // },

  // {
  //   path: '**',
  //   redirectTo: 'dashboard'
  // }



];
