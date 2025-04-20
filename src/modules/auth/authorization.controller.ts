import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { Auth } from 'src/shared/decorators/auth.decorator'
import { CurrentUser } from 'src/shared/decorators/current.user.decorator'

import { AuthorizationService } from './authorization.service'
import { AUTHORIZATION_ROUTES } from './config/authorization.routes'
import {
	ChangePasswordDto,
	LoginDto,
	RegisterDto
} from './dto/authorization.dto'

@Controller(AUTHORIZATION_ROUTES.INDEX)
export class AuthorizationController {
	constructor(private readonly authorizationService: AuthorizationService) {}

	@HttpCode(200)
	@Post(AUTHORIZATION_ROUTES.LOGIN)
	async login(@Body() dto: LoginDto) {
		return this.authorizationService.login(dto)
	}

	@HttpCode(200)
	@Post(AUTHORIZATION_ROUTES.REGISTER)
	async register(@Body() dto: RegisterDto) {
		return this.authorizationService.create(dto)
	}

	@HttpCode(200)
	@Auth()
	@Post(AUTHORIZATION_ROUTES.CHANGE_PASSWORD)
	async changePassword(
		@CurrentUser('id') id: string,
		@Body() dto: ChangePasswordDto
	) {
		return this.authorizationService.changePassword(id, dto)
	}
}
