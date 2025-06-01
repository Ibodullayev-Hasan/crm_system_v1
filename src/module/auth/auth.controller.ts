import { Controller, Post, Body, HttpCode, HttpStatus, Res, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { Request, Response } from 'express';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from '../../shared/guards/auth.token.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  // register
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() createUserDto: CreateUserDto, @Res() res: Response) {

    const data: object = await this.authService.register(createUserDto)

    res.json({ success: true, message: `User registred`, data })
  }

  // login
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {

    const data: object = await this.authService.login(loginDto)

    res.json({ success: true, message: `User log in`, data })
  }

  // refresh
  @UseGuards(JwtAuthGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Req() req: Request, @Res() res: Response) {

    const data: object = await this.authService.refresh(req.user)

    res.json({ success: true, message: `access token refresh`, data })
  }

  // logOut
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logOut(@Req() req: Request, @Res() res: Response) {

    await this.authService.logOut(req.user.id)

    res.json({ success: true, message: `User log out`, })
  }


}
