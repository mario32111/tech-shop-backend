import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ClientProxy, ClientProxyFactory, Transport, RmqOptions } from "@nestjs/microservices";
import { RabbitMQ } from "../constants";

@Injectable()
export class ClientProxySuperFlights {
    constructor(private readonly config: ConfigService) {}

    // Generar la conexión y configuración de RabbitMQ para usuarios
    clientProxyUsers(): ClientProxy {

        return ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: [this.config.get<string>('AMQP_URL')], // Convertir en array
                queue: RabbitMQ.UserQueue,
                queueOptions: { durable: true }, // Opcional, para mantener mensajes persistentes
            }
        } as RmqOptions);
    }

    // Generar la conexión y configuración de RabbitMQ para pasajeros   
    clientProxyPassengers(): ClientProxy {
        return ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: [this.config.get<string>('AMQP_URL')], // Convertir en array
                queue: RabbitMQ.PassengerQueue,
                queueOptions: { durable: true },
            }
        } as RmqOptions);
    }

    // Generar la conexión y configuración de RabbitMQ para vuelos
    clientProxyFlights(): ClientProxy {
        return ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: [this.config.get<string>('AMQP_URL')], // Convertir en array
                queue: RabbitMQ.FlightQueue,
                queueOptions: { durable: true },
            }
        } as RmqOptions);
    }
}
