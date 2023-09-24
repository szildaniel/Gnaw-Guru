import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

export const saltRounds = 8;

export interface IRefreshToken extends Document {
  refreshToken: string;
  expirationTime: Date;
}

export interface IUser extends Document {
  name: string;
  password: string;
  email: string;
  roles: number[];
  refreshToken?: IRefreshToken;
}

const UserSchema: mongoose.Schema<IUser> = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  roles: { type: [Number] },
  refreshToken: {
    refreshToken: { type: String },
    expirationTime: { type: Date },
  },
});

UserSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, saltRounds);
  }
  next();
});

const UserModel = mongoose.model<IUser>("User", UserSchema);

export default UserModel;
