import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () =>
      import('./wrappers/default-wrapper/default-wrapper.module').then(m => m.DefaultWrapperModule)
  },
  // {
  //   path: 'mode/test',
  //   component: AppComponent,
  //   loadChildren: () =>
  //     import('./module-wrapper/module-wrapper.module').then(m => m.ModuleWrapperModule)
  // },
  // {
  //   path: '**',
  //   component: PageNotFoundComponent
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
