//clase DTO encargada de validar los datotos que el servidor envia al cliente
//ademas tambine sirve como referencia para los daots que procesa y crea el servidor antes de enviarlos al cliente

export interface IUser{
    name: string;
    username: string;
    email: string;
    password: string;
}