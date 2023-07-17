import { Schema, Document } from 'mongoose';

export interface Tree extends Document {
  name: string;
  image: string;
}

export const TreeSchema = new Schema<Tree>({
  name: { type: String, required: true },
  image: { type: String, required: true },
});
