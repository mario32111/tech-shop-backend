//clase DTO encargada de validar los datotos que el servidor envia al cliente
//ademas tambine sirve como referencia para los daots que procesa y crea el servidor antes de enviarlos al cliente
//aqui si se extiende de document por quese esta utilizando el esquema de mongoose, no como en el api gateway
export interface IUser extends Document {
    name: string;
    username: string;
    email: string;
    password: string;
}