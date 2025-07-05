import * as mongoose from 'mongoose';

export const FlightSchema = new mongoose.Schema({
    pilot: { type: String, required: true },
    airplane: { type: String, required: true },
    destinationCity: { type: String, required: true },
    flightDate: { type: Date, required: true },
    //esto es para mostrar los pasageros, con una referencia a la coleccion de pasajeros
    passengers: [{type: mongoose.Schema.Types.ObjectId, ref: 'passengers'}],
}, { timestamps: true }); //esto es para que se cree automaticamente la fecha de creacion y modificacion