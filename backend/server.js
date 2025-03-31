import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import locationRoutes from './api/routes/locationRoutes.js';
import propertyRoutes from './api/routes/propertyRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

// Log de verificação da URI
if (!MONGODB_URI) {
  console.error('❌ Variável de ambiente MONGODB_URI não está definida.');
  process.exit(1);
} else {
  console.log('✅ URI carregada:', MONGODB_URI);
}

// Middlewares
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/location', locationRoutes);
app.use('/api/properties', propertyRoutes);


mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

.then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
  });
})
.catch((error) => {
  console.error('MongoDB connection error:', error.message);
});
