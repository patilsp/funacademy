import { Schema, model, models } from 'mongoose';

const ProductSchema = new Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
  },
  model: {
    type: String,
  },
  capacity: {
    type: String,
  },
  technology: {
    type: String,
  },
  warranty: {
    type: String,
  },
  type: {
    type: String,
  },
  
});

const Product = models.Product || model('Product', ProductSchema);

export default Product;
