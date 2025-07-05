import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class FlightDto {

  //este decorador  indica que dicha propiedad para poderse mostrar en la api de swagger y que la muestre
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly pilot: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly airplane: string;  
  @ApiProperty()  
  @IsNotEmpty()
  @IsString()
  readonly destinationCity: string;
  @ApiProperty()
  @IsNotEmpty()
  //esto es para que el campo sea de tipo fecha, transforma el string a fecha
  @Type(()=> Date)
  @IsDate()
  readonly flightDate: Date; 
}