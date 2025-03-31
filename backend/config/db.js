const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://jeniferscosta:nn2iasZPw1uLWkiB@housematching.ty3tp.mongodb.net/?retryWrites=true&w=majority&appName=house-matching', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected!');
  } catch (error) {
    console.error('Erro ao conectar no MongoDB:', error);
    process.exit(1); // encerra o processo com erro
  }
};

module.exports = connectDB;
