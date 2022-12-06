import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../../shared/moduleconfig/config.service';
import { EntityService } from '../entity/entity.service';
import { StudentHouse } from './studentHouse.model';

@Injectable({
  providedIn: 'root',
})
export class StudentHouseService extends EntityService<StudentHouse> {
  constructor(private configService: ConfigService, http: HttpClient) {
    super(http, configService.getConfig().apiEndpoint, 'meal');
  }
}
