import { AuthGuard } from './auth.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'ingress',
    loadChildren: () => import('./ingress/ingress.module').then( m => m.IngressPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'channel/:chanName',
    loadChildren: () => import('./channel/channel.module').then( m => m.ChannelPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'private/:privName',
    loadChildren: () => import('./private/private.module').then( m => m.PrivatePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'configs',
    loadChildren: () => import('./configs/configs.module').then( m => m.ConfigsPageModule),
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
