import { ConfigService } from '@nestjs/config'
import { JwtModuleOptions } from '@nestjs/jwt'

export const getJWTConfig = (
	ConfigService: ConfigService
): JwtModuleOptions => ({
	secret: ConfigService.getOrThrow<string>('JWT_SECRET')
})
