import { Schema, Document } from 'mongoose';

export interface User extends Document {
  email: string;
  password: string;
  role: string;
}

export const UserSchema = new Schema<User>({
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
});
