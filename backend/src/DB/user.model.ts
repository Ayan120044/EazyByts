// src/models/user.model.ts
import { Schema, model, Types, Document } from "mongoose";

export interface UserDocument extends Document {
  name: string;
  username: string;
  email: string;
  password: string;
  portfolios: Types.ObjectId[]; // Reference to Portfolio documents
}

const UserSchema = new Schema<UserDocument>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      minlength: [3, "Username must be at least 3 characters"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [/\S+@\S+\.\S+/, "Invalid email"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
    },
    portfolios: [
      {
        type: Schema.Types.ObjectId,
        ref: "Portfolio",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const UserModel = model<UserDocument>("User", UserSchema);
