import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultWrapperComponent } from './default-wrapper.component';
import { AuthGuard } from '../../core/services/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'menu-items',
    component: DefaultWrapperComponent,
    loadChildren: () =>
      import('../../modules/feedback-menu-items/feedback-menu-items.module').then(m => m.FeedbackMenuItemsModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DefaultWrapperRoutingModule {
}
