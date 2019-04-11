import mongoose from 'mongoose';

delete mongoose.connection.models.UserProfile;

const { Schema } = mongoose;

const userProfileSchema = new Schema({
  displayName: { type: String },
  picture: { type: String },
  gender: { type: String },
  location: { type: String },
  website: { type: String },
  date: { type: Date, default: Date.now },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
});

export default mongoose.model('UserProfile', userProfileSchema);
