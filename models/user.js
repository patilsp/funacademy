import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  userId: { type: String, unique: true },
  email: { type: String },
  username: { type: String},
  phone: { type: String },
  dateOfBirth: { type: Date },
  role: { type: String },
}, { timestamps: true });

const User = models.User || model("User", UserSchema);

export default User;
