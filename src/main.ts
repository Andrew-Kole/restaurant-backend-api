import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionFilter } from './common/exception-filters/all.exception.filter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalFilters(new AllExceptionFilter());

    const config = new DocumentBuilder()
        .setTitle('Restaurant API')
        .setDescription('Pet project as showcase of programming skills')
        .setVersion('1.0')
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-docs', app, document);
    console.log('Swagger runs on /api-docs');

    await app.listen(process.env.PORT ?? 3000);
    console.log(`app is running on port ${process.env.PORT}`);
}
bootstrap();
