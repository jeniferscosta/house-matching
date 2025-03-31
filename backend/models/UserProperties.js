import mongoose from 'mongoose';

function arrayLimit(val) {
  return val.length > 0;
}

const userPropertiesSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  properties: {
    type: [String], // ex: ['apartment', 'house']
    required: true,
    validate: [arrayLimit, '{PATH} precisa ter ao menos uma propriedade.'],
  },
});

export default mongoose.model('UserProperties', userPropertiesSchema);
