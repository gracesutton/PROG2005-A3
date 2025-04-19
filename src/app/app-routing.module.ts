import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'error',
    loadChildren: () => import('./error/error.module').then( m => m.ErrorPageModule)
  },
  {
    path: '',
    redirectTo: '/tabs/tab0',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/error'
  }
  // {
  //   path: 'tab5',
  //   loadChildren: () => import('./tab5/tab5.module').then( m => m.Tab5PageModule)
  // },
  // {
  //   path: 'tab0',
  //   loadChildren: () => import('./tab0/tab0.module').then( m => m.Tab0PageModule)
  // },
  // {
  //   path: 'tab4',
  //   loadChildren: () => import('./tab4/tab4.module').then( m => m.Tab4PageModule)
  // }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
