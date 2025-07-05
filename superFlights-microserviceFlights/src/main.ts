import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RabbitMQ } from './common/constants';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  //se cambia el main por el de un microservicio
    const app = await NestFactory.createMicroservice(AppModule, {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.AMQP_URL], // URL de RabbitMQ desde la variable de entorno
        queue: RabbitMQ.FlightQueue,    // Nombre de la cola que estás utilizando
      },
    });

  await app.listen();
  console.log("Microservice Flights is listen")
}
bootstrap();
