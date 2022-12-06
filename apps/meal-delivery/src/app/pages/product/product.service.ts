import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../../shared/moduleconfig/config.service';
import { EntityService } from '../entity/entity.service';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends EntityService<Product> {
  constructor(private configService: ConfigService, http: HttpClient) {
    super(http, configService.getConfig().apiEndpoint, 'meal');
  }
}
