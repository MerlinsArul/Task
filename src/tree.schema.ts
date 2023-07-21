import { Schema, Document } from 'mongoose';

export interface Tree extends Document {
  name: string;
  image: string;
  remarks: string;
  country: string[];
  type: string;
}

export const TreeSchema = new Schema<Tree>({
  name: { type: String, required: true },
  image: { type: String, required: true },
  remarks: { type: String, required: true },
  country: { type: [String], required: true },
  type: { type: String, required: true },
});
