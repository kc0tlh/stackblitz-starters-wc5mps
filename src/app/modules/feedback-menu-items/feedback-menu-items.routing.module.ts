import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedbackMenuItemsComponent } from './feedback-menu-items.component';

const routes: Routes = [
  {
    path: '',
    component: FeedbackMenuItemsComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedbackMenuItemsRoutingModule {
}
