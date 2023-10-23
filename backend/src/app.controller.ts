import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { PrismaService } from './prisma.service';
import { LoginDto } from './login.dto'; 
import * as bcrypt from 'bcrypt';

@Controller()
export class AppController {
  constructor(readonly prismaService: PrismaService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() response: Response) {
    const { email, senha } = loginDto;
    console.log(email);
    console.log(senha);

    try {
      
      const user = await this.prismaService.user.findUnique({ where: { email } });
      
      if (!user) {
        console.log('Email:', email);
        return response.status(HttpStatus.NOT_FOUND).json({ error: 'User not found' });
      }
      
      

      if (!user.hashSenha) {
        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: 'User password not found' });
      }

      console.log('c');
      console.log(senha);
      console.log(user.hashSenha);
      const passwordMatches = await bcrypt.compare(senha, user.hashSenha);

     

      if (!passwordMatches) {
        return response.status(HttpStatus.UNAUTHORIZED).json({ error: 'Invalid password' });
      }

     

      return response.status(HttpStatus.OK).json({ message: 'Login successful' });
    } catch (error) {
      console.error('Error during login:', error);
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
  }
}