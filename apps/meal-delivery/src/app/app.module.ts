import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './shared/nav/nav.component';
import { MealComponent } from './pages/meal/meal.component';
import { ListComponent as ListComponentMeal } from './pages/meal/list/list.component';
import { DetailComponent as DetailComponentMeal } from './pages/meal/detail/detail.component';
import { EditComponent as EditComponentMeal } from './pages/meal/edit/edit.component';
import { AboutComponent } from './pages/about/about.component';
import { UserComponent } from './pages/user/user.component';
import { ListComponent as ListComponentUser } from './pages/user/list/list.component';
import { DetailComponent as DetailComponentUser } from './pages/user/detail/detail.component';
import { EditComponent as EditComponentUser } from './pages/user/edit/edit.component';
import { ProductComponent } from './pages/product/product.component';
import { ListComponent as ListComponentProduct } from './pages/product/list/list.component';
import { DetailComponent as DetailComponentProduct } from './pages/product/detail/detail.component';
import { EditComponent as EditComponentProduct } from './pages/product/edit/edit.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { FooterComponent } from './shared/footer/footer.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    MealComponent,
    ListComponentMeal,
    DetailComponentMeal,
    EditComponentMeal,
    AboutComponent,
    UserComponent,
    ListComponentUser,
    DetailComponentUser,
    EditComponentUser,
    ProductComponent,
    ListComponentProduct,
    DetailComponentProduct,
    EditComponentProduct,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    MealComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
