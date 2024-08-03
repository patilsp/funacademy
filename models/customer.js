import { Schema, model, models } from 'mongoose';

const CustomerSchema = new Schema({

  id: {
    type: String,
  },
  userId: {
    type: String,
  },
  customerId: {
    type: String,
  },
  name: {
    type: String,
    required: [true, 'Customer Name is required.'],
  },
  phone: {
    type: String,
    required: [true, 'Customer Name is required.'],
  },
  email: {
    type: String,
  },
  address: {
    type: String,
  },
  dateofbirth:
  {
    type: String,
  },
  status: {
    type: String,
  },
  area:{
    type: String,
  },
  pincode: {
    type: String,
  },
});

const Customer = models.Customer || model('Customer', CustomerSchema);

export default Customer;