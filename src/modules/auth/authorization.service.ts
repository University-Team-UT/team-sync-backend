import {
	BadRequestException,
	Injectable,
	UnauthorizedException
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { compare, genSalt, hash } from 'bcryptjs'
import { User } from 'generated/prisma'
import { DatabaseService } from 'src/core/database/database.service'
import { issueAccessToken } from 'src/shared/utils/issue-access-token.util'

import {
	ChangePasswordDto,
	LoginDto,
	RegisterDto
} from './dto/authorization.dto'

@Injectable()
export class AuthorizationService {
	constructor(
		private readonly database: DatabaseService,
		private readonly jwtService: JwtService
	) {}

	async login(dto: LoginDto) {
		const user = await this.validateUser(dto)
		return {
			user: this.returnUserFields(user),
			accessToken: await issueAccessToken(user.id, this.jwtService)
		}
	}

	async create(dto: RegisterDto) {
		const oldUser = await this.database.user.findUnique({
			where: {
				email: dto.email
			}
		})
		if (oldUser) throw new BadRequestException('Почта занята')

		const salt = await genSalt(10)

		const newUser = await this.database.user.create({
			data: {
				password: await hash(dto.password, salt),
				email: dto.email,
				displayName: dto.displayName
			}
		})
		return {
			user: this.returnUserFields(newUser)
		}
	}

	async changePassword(userId: string, dto: ChangePasswordDto) {
		const user = await this.database.user.findUnique({
			where: {
				id: userId
			}
		})
		if (!user) throw new UnauthorizedException('Пользователь не найден')

		const isValidPassword = await compare(dto.oldPassword, user.password)
		if (!isValidPassword) throw new UnauthorizedException('Неверный пароль')

		await this.database.user.update({
			where: {
				id: user.id
			},
			data: {
				password: dto.newPassword
			}
		})
		return true
	}

	async validateUser(dto: LoginDto): Promise<User> {
		const user = await this.database.user.findUnique({
			where: {
				email: dto.email
			}
		})
		if (!user) throw new UnauthorizedException('Пользователь не найден')

		const isValidPassword = await compare(dto.password, user.password)
		if (!isValidPassword) throw new UnauthorizedException('Неверный пароль')

		return user
	}

	returnUserFields(user: User) {
		return {
			id: user.id,
			email: user.email,
			displayName: user.displayName
		}
	}
}
