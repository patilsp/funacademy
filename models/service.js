import { Schema, model, models } from 'mongoose';

const ServiceSchema = new Schema({
  userId: {
    type: String,
  },
  inquiryId: {
    type: String,
  },
  username: {
    type: String,
  },
  name: {
    type: String,
  },
  mobile: {
    type: String,
  },
   note: {
    type: String,
  },
  inquiryType: {
    type: String,
  },
  model: {
    type: String,
  },

});

const Service = models.Service || model('Service', ServiceSchema);

export default Service;
