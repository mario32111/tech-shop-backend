//en enste caso al ser un microserivicio se quirtan los decoradores que se pusieron en la api monolitica
export class UserDto {
    readonly name: string;
    readonly username: string;
    readonly email: string;
    readonly password: string;
} 