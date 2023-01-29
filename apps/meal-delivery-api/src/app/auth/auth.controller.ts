import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';

import { LocalStorage, UserCredentials, UserRegistration } from '@md/data';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() credentials: UserRegistration): Promise<LocalStorage> {
    try {
      await this.authService.registerUser(
        credentials.username,
        credentials.password,
        credentials.emailAddress
      );

      return {
        token: await this.authService.generateToken(
          credentials.username,
          credentials.password
        ),

        id: await this.authService.createUser(
          credentials.username,
          credentials.emailAddress,
          credentials.isGraduated,
          credentials.role
        ),
      };
    } catch (e) {
      throw new HttpException(
        'Gebruikersnaam of e-mailadres ongeldig omdat gebruiker al bestaat.' +
          e,
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Post('login')
  async login(@Body() credentials: UserCredentials): Promise<LocalStorage> {
    try {
      return {
        token: await this.authService.generateToken(
          credentials.username,
          credentials.password
        ),
        id: (
          await this.authService.getId(
            credentials.username,
            credentials.password
          )
        ).toString(),
      };
    } catch (e) {
      let errorMessage = 'Failed to do something exceptional';
      if (e instanceof Error) {
        errorMessage = e.message;
      }
      console.log('Login error: ' + errorMessage);
      throw new HttpException(
        'Ongeldige inloggegevens',
        HttpStatus.UNAUTHORIZED
      );
    }
  }
}
