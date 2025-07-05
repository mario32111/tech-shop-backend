
export class FlightDto {
  //aqui se eliminan los decoradores, por que el microservicio no se encarga de las validaciones
  readonly pilot: string;
  readonly airplane: string;  
  readonly destinationCity: string;
  readonly flightDate: Date; 
}