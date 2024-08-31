import mongoose from 'mongoose';

const responseSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  questions: { type: Array, required: true },
  selectedOptions: { type: Array, required: true },
});

export default mongoose.models.Response || mongoose.model('Response', responseSchema);
