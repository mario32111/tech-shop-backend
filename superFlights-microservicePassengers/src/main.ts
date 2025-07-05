import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { RabbitMQ } from './common/constants';

async function bootstrap() {
  try {
    const app = await NestFactory.createMicroservice(AppModule, {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.AMQP_URL], // URL de RabbitMQ desde la variable de entorno
        queue: RabbitMQ.PassengerQueue,    // Nombre de la cola que estás utilizando
      },
    });

    // Inicia el microservicio
    await app.listen();
    console.log('Microservice Passengers is listening');
  } catch (err) {
    // Si ocurre un error, lo capturamos y mostramos en la consola
    console.error('Error al conectar con RabbitMQ:', err);
  }
}

bootstrap();
