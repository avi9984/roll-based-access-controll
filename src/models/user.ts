import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
    name: {type:String,required:true,trim:true},
    email: {type:String,required:true, unique:true,trim:true},
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    password: {type:String,required:true, minLength:8,trim:true},
    registrationDate:{type:String},
  },{versionKey:false});

  export default mongoose.model('User', userSchema);