import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { RabbitMQ } from './common/constants';

async function bootstrap() {
  try {
    // Verifica que la URL de RabbitMQ se haya cargado correctamente
    console.log('AMQP_URL:', process.env.AMQP_URL);

    // Crea el microservicio NestJS con RabbitMQ
    const app = await NestFactory.createMicroservice(AppModule, {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.AMQP_URL], // URL de RabbitMQ desde la variable de entorno
        queue: RabbitMQ.UserQueue,    // Nombre de la cola que estás utilizando
      },
    });

    // Inicia el microservicio
    await app.listen();
    console.log('Microservice Users is listening');
  } catch (err) {
    // Si ocurre un error, lo capturamos y mostramos en la consola
    console.error('Error al conectar con RabbitMQ:', err);
  }
}

bootstrap();
