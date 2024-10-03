import {
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccessToken } from './type/access-token.type';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async getAPIKey(tokenFor: string): Promise<AccessToken> {
    const tokenValidFor = await this.configService.get<string>('JWT_EXPIRATION');
    const accessTokenPayload = { sub: tokenFor };
    try {
      const accessToken = await this.jwtService.signAsync(accessTokenPayload);
      return { type: 'bearer', accessToken, validFor: tokenValidFor };
    } catch (error) {
      throw new InternalServerErrorException({
        message: 'Fail to create access token',
        jwtError: error,
      });
    }
  }
}
