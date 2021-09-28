import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'channels',
        loadChildren: () => import('./channels/channels.module').then( m => m.ChannelsPageModule)
      },
      {
        path: 'privs',
        loadChildren: () => import('./privs/privs.module').then( m => m.PrivsPageModule)
      },
      {
        path: 'list',
        loadChildren: () => import('./list/list.module').then( m => m.ListPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/channels',
        pathMatch: 'full'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
