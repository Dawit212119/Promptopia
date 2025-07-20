import { Schema, model, models } from "mongoose";
import validator from "validator";

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email exist"],
    validate: {
      validator: function (v: string) {
        return validator.isEmail(v);
      },
    },
    lowercase: true,
    trim: true,
  },
  username: {
    type: String,
    default: "USERNAME",
    required: [true, "Email is required"],
    match: [
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      "Username invalid, it should contain 8-20 alphanumeric letters and be unique!",
    ],
  },
  image: {
    type: String,
  },
});
userSchema.index({ email: 1 }, { unique: true });
const User = models.User || model("User", userSchema); //  because HRM of nextjs
export default User;
