import express from 'express';
import viewEngine from './config/viewEngine';
import initWebRoutes from './routes';
import connectDB from './config/connectDB';
import cors from 'cors';
require('dotenv').config();

let app = express();
app.use(cors({ origin: true }));

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

viewEngine(app);

app.use(initWebRoutes);

connectDB();

let port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
