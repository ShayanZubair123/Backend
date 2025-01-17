const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const orderRoutes = require('./routes/order');
const ProductRoute = require('./routes/Product');
dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/Product', ProductRoute);

mongoose.connect('mongodb+srv://zubairshayan70:KBW123@cluster0.unwex.mongodb.net/mydb')
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log(error));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
