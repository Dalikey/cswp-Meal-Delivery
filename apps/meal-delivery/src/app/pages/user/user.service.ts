import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../../shared/moduleconfig/config.service';
import { EntityService } from '../entity/entity.service';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService extends EntityService<User> {
  constructor(private configService: ConfigService, http: HttpClient) {
    super(http, configService.getConfig().apiEndpoint, 'user');
  }
}
