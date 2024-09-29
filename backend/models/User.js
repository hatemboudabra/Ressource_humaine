const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username : {type: String , required: true , unique: true},
    email: { type: String, unique: true },
    password: { type: String, required: true },
    Roles : {
        type : String,
        enum : ['Admin','Employe' , 'RH'],
        default: 'Employe'
    },
    createdAt: { type: Date, default: Date.now },
});
userSchema.pre('save', async function(next) {
  const user = this;
  if (user.isModified('password')) {
      user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});
module.exports = mongoose.model('User', userSchema);