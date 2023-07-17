import { Schema, Document } from 'mongoose';

export interface Car extends Document {
  name: string;
  image: string;
}

export const CarSchema = new Schema<Car>({
  name: { type: String, required: true },
  image: { type: String, required: true },
});
