import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Meal } from './meal.model';
import { ConfigService } from '../../shared/moduleconfig/config.service';
import { EntityService } from '../entity/entity.service';

@Injectable({
  providedIn: 'root',
})
export class MealService extends EntityService<Meal> {
  constructor(private configService: ConfigService, http: HttpClient) {
    super(http, configService.getConfig().apiEndpoint, 'meal');
  }
}
