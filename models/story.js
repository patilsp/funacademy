import { Schema, model, models } from 'mongoose';

const StorySchema = new Schema({
  userId: { type: String },
  title: { type: String },
  description: { type: String},
}, { timestamps: true });

const Story = models.Story || model("Story", StorySchema);

export default Story;
