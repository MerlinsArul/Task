// import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
// import { Observable } from 'rxjs';
// import { JwtService } from '@nestjs/jwt';

// @Injectable()
// export class AuthGuard implements CanActivate {
//   constructor(private readonly jwtService: JwtService) {}

//   canActivate(
//     context: ExecutionContext,
//   ): boolean | Promise<boolean> | Observable<boolean> {
//     const request = context.switchToHttp().getRequest();
//     return this.validateRequest(request);
//   }

//   async validateRequest(request: any): Promise<boolean> {
//     const token = request.headers.authorization;

//     try {
//       if (token) {
//         console.log(token, 'TOKEN');
//         const options: any = { secret: '12345' };
//         const decoded = this.jwtService.verify(token.split('.')[0], options);
//         console.log(decoded, '1234');
//         request.user = decoded;
//         return true;
//       }
//       // return false;
//     } catch (err) {
//       console.log(err);

//       return false;
//     }
//   }
// }

import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: '12345',
      });
      request.user = payload;
      const allowedRoles = ['user', 'admin']; // Adjust based on your role definitions
      const userRole = payload.role;

      if (!allowedRoles.includes(userRole)) {
        throw new UnauthorizedException('Insufficient permissions');
      }
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request): string | undefined {
    const authorization = request.headers.authorization;
    if (authorization && authorization.startsWith('Bearer ')) {
      return authorization.split(' ')[1];
    }
    return undefined;
  }
}

@Injectable()
export class AdminAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: '12345',
      });
      request.user = payload;

      const requiredRole = 'admin';
      if (payload.role !== requiredRole) {
        throw new UnauthorizedException('Insufficient permissions');
      }
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request): string | undefined {
    const authorization = request.headers.authorization;
    if (authorization && authorization.startsWith('Bearer ')) {
      return authorization.split(' ')[1];
    }
    return undefined;
  }
}
