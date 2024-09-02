import mongoose from 'mongoose'

const StudentSchema = new mongoose.Schema({  
  username: {
    type: String,
    required: [true, 'Please provide a username'],
    maxlength: [60, 'Username cannot be more than 60 characters'],
  },
  dateOfBirth: {
    type: Date,
    required: [true, 'Please provide a date of birth'],
  },
  age: {
    type: Number,
    required: [true, 'Please provide an age'],
    min: [1, 'Age must be at least 1'],
    max: [7, 'Age must not exceed 7'],
  },
    
  profileImage: {
    type: String,
    default: null,
  },
}, { timestamps: true })

export default mongoose.models.Student || mongoose.model('Student', StudentSchema)