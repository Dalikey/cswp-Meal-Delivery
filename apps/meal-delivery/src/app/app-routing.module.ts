import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ListComponent as ListComponentMeal } from './pages/meal/list/list.component';
import { DetailComponent as DetailComponentMeal } from './pages/meal/detail/detail.component';
import { EditComponent as EditComponentMeal } from './pages/meal/edit/edit.component';
import { AboutComponent } from './pages/about/about.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ListComponent as ListComponentUser } from './pages/user/list/list.component';
import { DetailComponent as DetailComponentUser } from './pages/user/detail/detail.component';
import { EditComponent as EditComponentUser } from './pages/user/edit/edit.component';
import { ListComponent as ListComponentProduct } from './pages/product/list/list.component';
import { DetailComponent as DetailComponentProduct } from './pages/product/detail/detail.component';
import { EditComponent as EditComponentProduct } from './pages/product/edit/edit.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'dashboard', pathMatch: 'full', component: DashboardComponent },

  { path: 'meal', pathMatch: 'full', component: ListComponentMeal },
  { path: 'meal/new', pathMatch: 'full', component: EditComponentMeal },
  { path: 'meal/:id', pathMatch: 'full', component: DetailComponentMeal },
  { path: 'meal/:id/edit', pathMatch: 'full', component: EditComponentMeal },

  { path: 'about-us', pathMatch: 'full', component: AboutComponent },

  { path: 'user', pathMatch: 'full', component: ListComponentUser },
  { path: 'user/new', pathMatch: 'full', component: EditComponentUser },
  { path: 'user/:id', pathMatch: 'full', component: DetailComponentUser },
  { path: 'user/:id/edit', pathMatch: 'full', component: EditComponentUser },

  { path: 'product', pathMatch: 'full', component: ListComponentProduct },
  { path: 'product/new', pathMatch: 'full', component: EditComponentProduct },
  { path: 'product/:id', pathMatch: 'full', component: DetailComponentProduct },
  { path: 'product/:id/edit', pathMatch: 'full', component: EditComponentProduct },

  { path: 'register', pathMatch: 'full', component: RegisterComponent },
  { path: 'login', pathMatch: 'full', component: LoginComponent },
  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
