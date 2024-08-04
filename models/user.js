import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  userId: { type: String, unique: true },
  username: { type: String},
  dateOfBirth: { type: Date },
  age: { type: String },
}, { timestamps: true });

const User = models.User || model("User", UserSchema);

export default User;
