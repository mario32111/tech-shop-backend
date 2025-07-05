import * as mongoose from 'mongoose';

export const PassengerSchema = new mongoose.Schema({
    name: String,
    email: String,
});

//validacion para que el email sea unico y no se repita
PassengerSchema.index({ email: 1 }, { unique: true });