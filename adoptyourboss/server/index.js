import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import offresRoutes from './routes/offres.js';
import userRoutes from './routes/users.js';
import eventsRoutes from './routes/events.js';
import newsRoutes from './routes/news.js';
import amisRoutes from './routes/amis.js'
import chatRoutes from './routes/chat.js';


const app = express();


app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(
    cors({ 
        Origin: 'http://localhost:5000', 
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        allowedHeaders: [
            'Content-Type', 
            'Authorization', 
            'Origin', 
            'x-access-token', 
            'XSRF-TOKEN'
        ], 
        preflightContinue: false
    })
  );

  app.use('/offres', offresRoutes);
  app.use('/users', userRoutes);
  app.use('/events', eventsRoutes);
  app.use('/news', newsRoutes);
  app.use('/amis', amisRoutes);
  app.use('/messages', chatRoutes)

  app.use('/admin/offres', offresRoutes);
  app.use('/admin/users', userRoutes);
  app.use('/admin/events', eventsRoutes);
  app.use('/admin/news', newsRoutes);



const CONNECTION_URL = 'mongodb+srv://admin:admin@cluster0.yf65c.mongodb.net/adoptyourboss?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`)))
        .catch((error) => console.log(error.message));
