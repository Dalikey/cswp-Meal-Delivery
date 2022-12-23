import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { ApiResponse } from '@md/data';
import { Product } from './product.model';
import { AuthService } from '../../auth/auth.service';
import { ConfigService } from '../../shared/moduleconfig/config.service';
import { AlertService } from '../../shared/alert/alert.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private configService: ConfigService,
    private alertService: AlertService
  ) {}
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getAllProducts(): Observable<Product[] | null | undefined> {
    return this.http
      .get<ApiResponse<Product[]>>(
        `${this.configService.getConfig().apiEndpoint}api/product`,
        this.httpOptions
      )
      .pipe(
        map((data: any) => {
          return data.results;
        }),
        catchError((e) => {
          console.log('Unable to connect to database. ' + e.error.message);
          this.alertService.error('Kan geen verbinding maken met de database.');
          return of(undefined);
        })
      );
  }

  getProductById(id: string): Observable<Product | null | undefined> {
    return this.http
      .get<Product>(
        `${this.configService.getConfig().apiEndpoint}api/product/${id}`,
        this.httpOptions
      )
      .pipe(
        map((data: any) => {
          return data.results;
        }),
        catchError((e) => {
          console.log('Unable to connect to database. ' + e.error.message);
          this.alertService.error('Kan geen verbinding maken met de database.');
          return of(undefined);
        })
      );
  }

  addProduct(newProduct: Product) {
    return this.http
      .post<Product>(
        `${this.configService.getConfig().apiEndpoint}api/product`,
        newProduct,
        this.httpOptions
      )
      .pipe(
        map((data: any) => {
          return data.results;
        }),
        catchError((e) => {
          console.log('Unable to connect to database. ' + e.error.message);
          this.alertService.error('Product bestaat al.');
          return of(undefined);
        })
      );
  }

  updateProduct(updatedProduct: Product) {
    return this.http
      .put<Product>(
        `${this.configService.getConfig().apiEndpoint}api/product/${
          updatedProduct.id
        }`,
        updatedProduct,
        this.httpOptions
      )
      .pipe(
        map((data: any) => {
          return data.results;
        }),
        catchError((e) => {
          console.log('Unable to connect to database. ' + e.error.message);
          this.alertService.error('Kan geen verbinding maken met de database.');
          return of(undefined);
        })
      );
  }

  deleteProduct(id: string) {
    return this.http
      .delete<Product>(
        `${this.configService.getConfig().apiEndpoint}api/product/${id}`,
        this.httpOptions
      )
      .pipe(
        map((data: any) => {
          return data.results;
        }),
        catchError((e) => {
          console.log('Unable to connect to database. ' + e.error.message);
          this.alertService.error('Kan geen verbinding maken met de database.');
          return of(undefined);
        })
      );
  }
}
