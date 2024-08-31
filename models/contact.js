import { Schema, model, models } from 'mongoose';

const ContactSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  message: {
    type: String,
  },
});

const Contact = models.Contact || model('Contact', ContactSchema);

export default Contact;