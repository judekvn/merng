import mongoose from 'mongoose';

delete mongoose.connection.models.UserClaim;

const { Schema } = mongoose;

const userClimeSchema = new Schema({
  type: { type: String },
  value: { type: String },
  date: { type: Date, default: Date.now },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
});

export default mongoose.model('UserClaim', userClimeSchema);
