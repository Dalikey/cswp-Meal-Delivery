import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AboutComponent } from './pages/about/about.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MealComponent } from './pages/meal/meal.component';
import { ListComponent as ListComponentMeal } from './pages/meal/list/list.component';
import { DetailComponent as DetailComponentMeal } from './pages/meal/detail/detail.component';
import { EditComponent as EditComponentMeal } from './pages/meal/edit/edit.component';
import { UserComponent } from './pages/user/user.component';
import { ListComponent as ListComponentUser } from './pages/user/list/list.component';
import { DetailComponent as DetailComponentUser } from './pages/user/detail/detail.component';
import { EditComponent as EditComponentUser } from './pages/user/edit/edit.component';
import { ProductComponent } from './pages/product/product.component';
import { ListComponent as ListComponentProduct } from './pages/product/list/list.component';
import { DetailComponent as DetailComponentProduct } from './pages/product/detail/detail.component';
import { EditComponent as EditComponentProduct } from './pages/product/edit/edit.component';
import { StudentHouseComponent } from './pages/studentHouse/studentHouse.component';
import { ListComponent as ListComponentStudentHouse } from './pages/studentHouse/list/list.component';
import { DetailComponent as DetailComponentStudentHouse } from './pages/studentHouse/detail/detail.component';
import { EditComponent as EditComponentStudentHouse } from './pages/studentHouse/edit/edit.component';
import { LoggedInAuthGuard, SaveEditedWorkGuard } from './auth/auth.guards';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'dashboard', pathMatch: 'full', component: DashboardComponent },
  { path: 'about-us', pathMatch: 'full', component: AboutComponent },
  { path: 'register', pathMatch: 'full', component: RegisterComponent },
  { path: 'login', pathMatch: 'full', component: LoginComponent },
  {
    path: 'meal',
    component: MealComponent,
    children: [
      { path: '', pathMatch: 'full', component: ListComponentMeal },
      {
        path: 'new',
        pathMatch: 'full',
        canActivate: [LoggedInAuthGuard],
        component: EditComponentMeal,
      },
      { path: ':id', pathMatch: 'full', component: DetailComponentMeal },
      {
        path: ':id/edit',
        pathMatch: 'full',
        canActivate: [LoggedInAuthGuard],
        component: EditComponentMeal,
      },
    ],
  },
  {
    path: 'user',
    component: UserComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        canActivate: [LoggedInAuthGuard],
        component: ListComponentUser,
      },
      {
        path: 'new',
        pathMatch: 'full',
        canActivate: [LoggedInAuthGuard],
        component: EditComponentUser,
      },
      {
        path: ':id',
        pathMatch: 'full',
        canActivate: [LoggedInAuthGuard],
        component: DetailComponentUser,
      },
      {
        path: ':id/edit',
        pathMatch: 'full',
        canActivate: [LoggedInAuthGuard],
        component: EditComponentUser,
      },
    ],
  },
  {
    path: 'product',
    component: ProductComponent,
    children: [
      { path: '', pathMatch: 'full', component: ListComponentProduct },
      {
        path: 'new',
        pathMatch: 'full',
        canActivate: [LoggedInAuthGuard],
        component: EditComponentProduct,
      },
      { path: ':id', pathMatch: 'full', component: DetailComponentProduct },
      {
        path: ':id/edit',
        pathMatch: 'full',
        canActivate: [LoggedInAuthGuard],
        component: EditComponentProduct,
      },
    ],
  },
  {
    path: 'studentHouse',
    component: StudentHouseComponent,
    children: [
      { path: '', pathMatch: 'full', component: ListComponentStudentHouse },
      {
        path: 'new',
        pathMatch: 'full',
        canActivate: [LoggedInAuthGuard],
        component: EditComponentStudentHouse,
      },
      {
        path: ':id',
        pathMatch: 'full',
        component: DetailComponentStudentHouse,
      },
      {
        path: ':id/edit',
        pathMatch: 'full',
        canActivate: [LoggedInAuthGuard],
        component: EditComponentStudentHouse,
      },
    ],
  },
  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
