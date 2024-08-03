import { Schema, model, models } from 'mongoose';

const ComplaintSchema = new Schema({
  userId: {
    type: String,
  },
  name: {
    type: String,
  },
  mobile: {
    type: String,
  },
  address: {
    type: String,
  },
  complaintType: {
    type: String,
  },
  productType: {
    type: String,
  },
  visitDate: {
    type: Date,
  },
  status: {
    type: String,
    default: 'Active', 
  },
  assignUser: { type: String, default: null },

}, { timestamps: true }); 

const Complaint = models.Complaint || model('Complaint', ComplaintSchema);

export default Complaint;
