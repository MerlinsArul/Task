import { Schema, Document } from 'mongoose';

export interface Car extends Document {
  name: string;
  image: string;
  color: string;
  country: string[];
  wheel: string;
  newField?: any;
}

export const CarSchema = new Schema<Car>({
  name: { type: String, required: true },
  image: { type: String, required: true },
  color: { type: String, required: true },
  country: { type: [String], required: true },
  wheel: { type: String, required: true },
  newField: { type: String },
});
