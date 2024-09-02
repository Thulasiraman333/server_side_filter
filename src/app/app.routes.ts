import { Routes } from '@angular/router';
import { ServerSidePaginationComponent } from './pages/server-side-pagination/server-side-pagination.component';

export const routes: Routes = [
  {
    path: '', redirectTo: 'ServerSidePage', pathMatch: 'full'
  },
  {
    path: 'ServerSidePage', component: ServerSidePaginationComponent
  }
];
