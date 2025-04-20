import {
	Injectable,
	NotFoundException,
	UnauthorizedException
} from '@nestjs/common'
import { compare } from 'bcryptjs'
import { DatabaseService } from 'src/core/database/database.service'

import { UpdateAccountDto } from './dto/account,dto'

@Injectable()
export class AccountService {
	constructor(private readonly database: DatabaseService) {}

	async getAccount(id: string) {
		return this.database.user.findFirst({
			where: { id },
			omit: { password: true }
		})
	}

	async updateAccount(id: string, dto: UpdateAccountDto) {
		return this.database.user.update({
			where: { id },
			data: dto
		})
	}
	async deleteAccount(id: string, password: string) {
		const user = await this.database.user.findFirst({
			where: { id }
		})
		if (!user) {
			throw new NotFoundException('Пользователь не найден')
		}

		const isValidPassword = await compare(password, user.password)
		if (!isValidPassword) throw new UnauthorizedException('Неверный пароль')

		return this.database.user.delete({
			where: { id }
		})
	}
}
