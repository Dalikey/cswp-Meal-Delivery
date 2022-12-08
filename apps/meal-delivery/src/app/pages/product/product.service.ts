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
      'Access-Control-Allow-Origin': '*',
    }),
  };
  private token = this.authService.getAuthorizationToken();

  getAllProducts(): Observable<Product[] | null | undefined> {
    this.httpOptions.headers = this.httpOptions.headers.set(
      'Authorization',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1pZXAiLCJpZCI6IjE4MTkyYzFiLTY1NTItNGRlMS1hMWM1LTQ0OTdmMDAyNDk2OCIsImlhdCI6MTY2OTYxODkxN30.YhZS0zdX-sHfcUu0QVzBQsyvWHwj9KLf1pTf4VBRFNE'
    );

    return this.http
      .get<ApiResponse<Product[]>>(
        `${this.configService.getConfig().apiEndpoint}api/product`,
        this.httpOptions
      )
      .pipe(
        tap(console.log),
        map((data: any) => {
          return data.results;
        }),
        catchError(() => {
          console.log('Unable to connect to database.');
          this.alertService.error('Kan geen verbinding maken met de database.');
          return of(undefined);
        })
      );
  }

  getProductById(id: string): Observable<Product | null | undefined> {
    this.httpOptions.headers = this.httpOptions.headers.set(
      'Authorization',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1pZXAiLCJpZCI6IjE4MTkyYzFiLTY1NTItNGRlMS1hMWM1LTQ0OTdmMDAyNDk2OCIsImlhdCI6MTY2OTYxODkxN30.YhZS0zdX-sHfcUu0QVzBQsyvWHwj9KLf1pTf4VBRFNE'
    );

    return this.http
      .get<Product>(
        `${this.configService.getConfig().apiEndpoint}api/product/${id}`,
        this.httpOptions
      )
      .pipe(
        tap(console.log),
        map((data: any) => {
          return data.results;
        }),
        catchError(() => {
          console.log('Unable to connect to database.');
          this.alertService.error('Kan geen verbinding maken met de database.');
          return of(undefined);
        })
      );
  }

  addProduct(newProduct: Product) {
    this.httpOptions.headers = this.httpOptions.headers.set(
      'Authorization',
      this.token!
    );

    return this.http
      .post<Product>(
        `${this.configService.getConfig().apiEndpoint}api/product`,
        newProduct,
        this.httpOptions
      )
      .pipe(
        tap(console.log),
        map((data: any) => {
          return data.results;
        }),
        catchError(() => {
          console.log('Unable to connect to database.');
          this.alertService.error('Kan geen verbinding maken met de database.');
          return of(undefined);
        })
      );
  }

  updateProduct(updatedProduct: Product) {
    this.httpOptions.headers = this.httpOptions.headers.set(
      'Authorization',
      this.token!
    );

    return this.http
      .put<Product>(
        `${this.configService.getConfig().apiEndpoint}api/product/${
          updatedProduct.id
        }`,
        updatedProduct,
        this.httpOptions
      )
      .pipe(
        tap(console.log),
        map((data: any) => {
          return data.results;
        }),
        catchError(() => {
          console.log('Unable to connect to database.');
          this.alertService.error('Kan geen verbinding maken met de database.');
          return of(undefined);
        })
      );
  }

  deleteProduct(id: string) {
    this.httpOptions.headers = this.httpOptions.headers.set(
      'Authorization',
      this.token!
    );

    return this.http
      .delete<Product>(
        `${this.configService.getConfig().apiEndpoint}api/product/${id}`,
        this.httpOptions
      )
      .pipe(
        tap(console.log),
        map((data: any) => {
          return data.results;
        }),
        catchError(() => {
          console.log('Unable to connect to database.');
          this.alertService.error('Kan geen verbinding maken met de database.');
          return of(undefined);
        })
      );
  }
}
