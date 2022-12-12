import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';

import { ResourceId, Token, UserCredentials, UserRegistration } from '@md/data';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() credentials: UserRegistration): Promise<ResourceId> {
    try {
      await this.authService.registerUser(
        credentials.username,
        credentials.password,
        credentials.emailAddress
      );

      return {
        id: await this.authService.createUser(
          credentials.username,
          credentials.emailAddress,
          credentials.isGraduated,
          credentials.phoneNumber
        ),
      };
    } catch (e) {
      throw new HttpException(
        'Gebruikersnaam of e-mailadres ongeldig omdat gebruiker al bestaat.',
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Post('login')
  async login(@Body() credentials: UserCredentials): Promise<Token> {
    try {
      return {
        token: await this.authService.generateToken(
          credentials.username,
          credentials.password
        ),
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
