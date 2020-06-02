import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
 {
    path: 'login',
    loadChildren: () => import('./login/login.module')
      .then( m => m.LoginModule)
  },
  {
    path: 'saldo',
    loadChildren: () => import('./saldo/saldo.module')
      .then( m => m.SaldoModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module')
      .then( m => m.HomePageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module')
      .then( m => m.RegistroModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'saldo',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, 
      {preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
