import mongoose from 'mongoose';

delete mongoose.connection.models.UserLogin;

const { Schema } = mongoose;

const userLoginSchema = new Schema({
  name: { type: String },
  key: { type: String },
  date: { type: Date, default: Date.now },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
});

export default mongoose.model('UserLogin', userLoginSchema);
