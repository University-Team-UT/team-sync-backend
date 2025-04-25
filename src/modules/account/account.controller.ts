import { Body, Controller, Delete, Get, HttpCode, Patch } from '@nestjs/common'
import { Auth } from 'src/shared/decorators/auth.decorator'
import { CurrentUser } from 'src/shared/decorators/current.user.decorator'

import { AccountService } from './account.service'
import { ACCOUNT_ROUTES } from './config/account.routes'
import { ChangePasswordDto, UpdateAccountDto } from './dto/account,dto'

@Controller(ACCOUNT_ROUTES.INDEX)
export class AccountController {
	constructor(private readonly accountService: AccountService) {}

	@HttpCode(200)
	@Auth()
	@Get()
	async getAccount(@CurrentUser('id') id: string) {
		return this.accountService.getAccount(id)
	}
	@HttpCode(200)
	@Auth()
	@Patch(ACCOUNT_ROUTES.UPDATE_ACCOUNT)
	async updateAccount(
		@CurrentUser('id') id: string,
		@Body() dto: UpdateAccountDto
	) {
		return this.accountService.updateAccount(id, dto)
	}
	@HttpCode(200)
	@Auth()
	@Delete(ACCOUNT_ROUTES.DELETE_ACCOUNT)
	async deleteAccount(
		@CurrentUser('id') id: string,
		@Body() dto: ChangePasswordDto
	) {
		return this.accountService.deleteAccount(id, dto.password)
	}
}
