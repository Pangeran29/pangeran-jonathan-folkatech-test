import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GenerateAPIKeyDto } from './dto/generate-api-key.dto';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { CurrentUser, GetCurrentUser } from '@app/common';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('generate-api-key')
  async generateAPIKey(@Body() dto: GenerateAPIKeyDto) {
    return await this.authService.getAPIKey(dto.tokenFor);
  }

  @ApiBearerAuth()
  @Get('me')
  @UseGuards(JwtAuthGuard)
  async me(@GetCurrentUser() currentUser: CurrentUser) {
    return currentUser;
  }
}
