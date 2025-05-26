import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { CoreModule } from './core/core.module'

async function bootstrap() {
	const app = await NestFactory.create(CoreModule)

	const config = app.get(ConfigService)

	app.enableCors({
		origin: '*',
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
		credentials: true
	})

	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			whitelist: true
		})
	)

	const swaggerConfig = new DocumentBuilder().setTitle('TeamSync').build()

	const document = SwaggerModule.createDocument(app, swaggerConfig)

	SwaggerModule.setup('api', app, document)

	const port = config.get<number>('APPLICATION_PORT') || 4222

	await app.listen(port)
}
bootstrap()
