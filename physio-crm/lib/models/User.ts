import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, trim: true },
    role: { type: String, enum: ["patient", "admin"], default: "patient" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const UserModel = models.User || model("User", UserSchema);
