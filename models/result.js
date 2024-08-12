import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema({
  userId: { type: String },
  levelId: { type: String },
  score: { type: Number },
  timestamp: { type: Date, default: Date.now },
});

const Result = mongoose.models.Result || mongoose.model('Result', resultSchema);
export default Result;
