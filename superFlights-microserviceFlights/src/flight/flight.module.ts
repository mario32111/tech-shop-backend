import { Module } from '@nestjs/common';
import { FlightController } from './flight.controller';
import { FlightService } from './flight.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FLIGHT, PASSENGER } from 'src/common/models/models';
import { FlightSchema } from './schema/flight.schema';
import { PassengerSchema } from './schema/passenger.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: FLIGHT.name,
        useFactory: () => {
          //este plugin es para que se muestren los pasajeros en la consulta de vuelos y no solo los id
          FlightSchema.plugin(require('mongoose-autopopulate'));
          return FlightSchema;
        }
      },
      {
        name: PASSENGER.name,
        useFactory: () => {
          //este no requiere el autopopulate por que ya no hay mas relaciones a resolver 
          PassengerSchema
          return PassengerSchema;
        }
      }
    ])
  ],
  controllers: [FlightController],
  providers: [FlightService]
})
export class FlightModule {}
