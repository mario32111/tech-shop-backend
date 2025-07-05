import e from 'express';
import * as mongoose from 'mongoose';
import { timestamp } from 'rxjs';

//este es el esquema de la bd, es decir la estructura de la tabla
export const UserSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        username: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
    }, { timestamps: true }
);


UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ username: 1 }, { unique: true });
