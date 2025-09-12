// apiGateway/src/common/proxy/client-proxy.ts

import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config"; // Asegúrate de que ConfigService esté importado
import { ClientProxy, ClientProxyFactory, Transport, RmqOptions } from "@nestjs/microservices";
import { RabbitMQ } from "../constants";

@Injectable()
export class ClientProxyTechShop {
    constructor(private readonly config: ConfigService) { } // ConfigService inyectado

    // Generar la conexión y configuración de RabbitMQ para usuarios
    clientProxyUsers(): ClientProxy {
        return ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: [this.config.get<string>('AMQP_URL')], // Correcto: usa ConfigService
                queue: RabbitMQ.UserQueue,
                queueOptions: { durable: true },
            }
        } as RmqOptions);
    }

    // Generar la conexión y configuración de RabbitMQ para productos
    clientProxyProducts(): ClientProxy {
        return ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: [this.config.get<string>('AMQP_URL')], // Correcto: usa ConfigService
                queue: RabbitMQ.ProductQueue,
                queueOptions: { durable: true },
            }
        } as RmqOptions);
    }

    // Generar la conexión y configuración de RabbitMQ para autenticación
    clientProxyAuth(): ClientProxy {
        return ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                // ¡CORRECCIÓN AQUÍ! Usa this.config.get() consistentemente
                urls: [this.config.get<string>('AMQP_URL')],
                queue: RabbitMQ.AuthQueue,
                queueOptions: { durable: true },
            }
        } as RmqOptions);
    }
}
