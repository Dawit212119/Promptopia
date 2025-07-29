import { model, models, Schema } from "mongoose";
//  one to many relationship between user and prompt

//  child referencing
const promptSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  prompt: {
    type: String,
    require: [true, "Prompt is required"],
  },
  tag: {
    type: String,
    require: [true, "Prompt is required"],
  },
});

promptSchema.index({ user: 1 });

const Prompt = models.Prompt || model("Prompt", promptSchema);
export default Prompt;
